import { GoogleGenerativeAI } from "@google/generative-ai";

export const analyzeCodebase = async (files, apiKey) => {
  if (!apiKey) {
    throw new Error("Gemini API key is missing");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    
    // Construct the prompt
    let prompt = `You are an expert developer with a talent for explaining complex concepts to non-coders.\n`;
    prompt += `I am providing you with the contents of a codebase. Please analyze it and explain what it does in plain English.\n\n`;
    prompt += `Provide your response in the following structured JSON format ONLY (no markdown backticks around the json, just the raw valid JSON object):\n`;
    prompt += `{
      "title": "A catchy name for the project",
      "bigPicture": "1-2 sentences summarizing the overall purpose of the project in simple terms.",
      "features": ["Feature 1 in plain English", "Feature 2", "Feature 3"],
      "architecture": "A simple analogy (e.g., 'Think of it like a restaurant...') explaining how the parts work together.",
      "keyComponents": [
        { "name": "Component name/file", "description": "What it does simply" }
      ]
    }\n\n`;
    
    prompt += `Here are the files in the codebase:\n\n`;
    
    // Add file contents to prompt
    // We limit to a reasonable amount to avoid token limits
    for (const file of files) {
      // Basic safeguard: skip large files
      if (file.content.length > 50000) {
         prompt += `--- ${file.path} (File too large, skipped) ---\n\n`;
         continue;
      }
      prompt += `--- File: ${file.path} ---\n${file.content}\n\n`;
    }

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Extract JSON block
    const startIndex = responseText.indexOf('{');
    const endIndex = responseText.lastIndexOf('}');
    
    if (startIndex === -1 || endIndex === -1) {
       console.log("Raw AI Response:", responseText);
       throw new Error("The AI did not return a valid JSON object.");
    }
    
    const cleanJson = responseText.substring(startIndex, endIndex + 1);
    
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Error analyzing codebase:", error);
    throw error;
  }
};
