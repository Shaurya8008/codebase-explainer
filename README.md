# Codebase Explainer in Plain English

**Understand any codebase, no coding required.** 

The Codebase Explainer is a beautiful, intuitive web application designed for non-technical users, product managers, and junior developers to instantly understand complex projects. Simply upload a folder containing a codebase, and our AI (powered by Google Gemini) will break it down into simple, plain English.

![Hero UI](/src/assets/hero.png) <!-- Update with actual screenshot path if added later -->

## ✨ Features

- **Drag & Drop Upload:** Natively select or drag an entire folder into the browser.
- **Smart Filtering:** Automatically ignores non-text files, large binaries, and heavy directories (like `node_modules` or `.git`) to ensure fast processing.
- **AI-Powered Analysis:** Uses the `gemini-flash-latest` AI model to analyze code structure and logic.
- **Plain English Explanations:**
  - **The Big Picture:** A 1-2 sentence high-level summary of what the project does.
  - **Key Features:** Bullet points highlighting the main capabilities.
  - **Architecture Analogy:** A simple, real-world analogy (like a restaurant) to explain how the parts fit together.
  - **Key Components:** A breakdown of the most important files and what they do.
- **Premium Design:** Built with React, featuring a stunning dark mode UI with glassmorphism effects and smooth Framer Motion animations.

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your machine.
- A free Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shaurya8008/codebase-explainer.git
   cd codebase-explainer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up your API Key:**
   - Click the gear icon inside the app to save your API key securely to local storage.
   - Alternatively, create a `.env.local` file in the root directory:
     ```env
     VITE_GEMINI_API_KEY="your_api_key_here"
     ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   Visit `http://localhost:5173` in your browser.

## 🛠️ Built With

- **React** (via Vite)
- **Framer Motion** (for buttery smooth animations)
- **Lucide React** (beautiful icons)
- **Google Generative AI SDK** (Gemini API integration)
- **Vanilla CSS** (for the ultra-premium glassmorphism UI)

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Shaurya8008/codebase-explainer/issues).

## 📝 License
This project is open source and available under the [MIT License](LICENSE).
