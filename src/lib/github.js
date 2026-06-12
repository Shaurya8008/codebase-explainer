export const fetchGithubRepo = async (url) => {
  try {
    // 1. Parse GitHub URL (e.g., https://github.com/owner/repo)
    let owner, repo;
    try {
      const urlObj = new URL(url);
      const parts = urlObj.pathname.split('/').filter(Boolean);
      if (parts.length >= 2) {
        owner = parts[0];
        repo = parts[1];
      } else {
        throw new Error("Invalid GitHub URL");
      }
    } catch (e) {
      throw new Error("Please enter a valid GitHub URL (e.g., https://github.com/facebook/react)");
    }

    // 2. Fetch repo details to get default branch
    const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    if (!repoRes.ok) {
      if (repoRes.status === 403) throw new Error("GitHub API rate limit exceeded. Please try again later or use the folder upload method.");
      if (repoRes.status === 404) throw new Error("Repository not found. Is it private?");
      throw new Error("Failed to fetch repository details.");
    }
    const repoData = await repoRes.json();
    const defaultBranch = repoData.default_branch;

    // 3. Fetch the repository tree
    const treeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${defaultBranch}?recursive=1`);
    if (!treeRes.ok) throw new Error("Failed to fetch repository tree.");
    const treeData = await treeRes.json();

    if (treeData.truncated) {
      console.warn("Repository tree is too large and was truncated.");
    }

    // 4. Filter for relevant files
    const validFiles = treeData.tree.filter(node => {
      if (node.type !== 'blob') return false;
      const path = node.path;
      
      // Filter out ignored directories and common binary/image extensions
      if (
        path.includes('node_modules/') || 
        path.includes('.git/') || 
        path.includes('dist/') || 
        path.includes('build/') ||
        path.includes('package-lock.json') ||
        path.includes('yarn.lock')
      ) return false;

      const ext = path.split('.').pop().toLowerCase();
      const ignoredExts = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'ico', 'mp4', 'mp3', 'woff', 'woff2', 'ttf', 'eot', 'pdf', 'zip'];
      if (ignoredExts.includes(ext)) return false;

      return true;
    });

    // 5. Cap the files to avoid massive network loads and token limits
    // We prioritize files in the root or common source directories if possible, 
    // but taking the first 50 valid files is a simple safeguard.
    const filesToFetch = validFiles.slice(0, 50);

    // 6. Fetch raw contents
    const filePromises = filesToFetch.map(async (fileNode) => {
      const rawRes = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/${fileNode.path}`);
      if (!rawRes.ok) return null;
      const content = await rawRes.text();
      return {
        path: fileNode.path,
        content: content
      };
    });

    const results = await Promise.all(filePromises);
    const validResults = results.filter(Boolean);

    if (validResults.length === 0) {
      throw new Error("No readable text files found in this repository.");
    }

    return validResults;
  } catch (error) {
    console.error("GitHub Fetch Error:", error);
    throw error;
  }
};
