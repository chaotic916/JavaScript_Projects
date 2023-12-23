const fs = require('fs').promises;
const path = require('path');

// Target for change is not a single specific file but a whole directory
async function rename(dir) {
  try {
    const files = await fs.readdir(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);

      // Check if it's a directory - boolean
      const isDirectory = (await fs.stat(filePath)).isDirectory();

      if ( isDirectory ) {
        // Recursively call the rename function for sub-directories
        await rename(filePath);
      } else if ( file.startsWith('IMG-') ) {
        // Get rid of the 'IMG-' part
        const newFileName = file.substring(4);

        // Construct the full paths. I will keep the old filePath to show in the console
        const newFilePath = path.join(dir, newFileName);

        // Rename the targets and report the progress
        await fs.rename(filePath, newFilePath);
        console.log(`File ${file} renamed to ${newFileName}`);
      }
    }
  } catch (err) {
    console.error(`Error reading or renaming files: ${err}`);
  }
}

// Check if a directory path is provided as a command-line argument
const directoryPath = process.argv[2];

if (!directoryPath) {
  console.error('Please provide a directory path as a command-line argument.');
} else {
  rename(directoryPath);
}
