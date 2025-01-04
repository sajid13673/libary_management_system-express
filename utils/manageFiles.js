const fs = require('fs').promises;
const path = require('path');

/**
 * Save an image to the local file system.
 * @param {string} filePath - The path of the file to be saved.
 * @param {string} originalname - The original name of the file.
 * @param {string} subFolder - The name of the subfolder to be save inside the uploads folder.
 * @returns {Promise<{ url: string, fileName: string }>} - A promise that resolves with the URL and file name.
 */

const saveFile = async (filePath, originalname, subFolder) => {
  const destinationPath = path.join(
    __dirname,
    `../uploads/${subFolder}`,
    originalname
  );
  const directory = path.dirname(destinationPath);
  try {
    // Ensure the directory exists
    await fs.mkdir(directory, { recursive: true });
    // Copy the file to the destination
    await fs.copyFile(filePath, destinationPath);
    // Delete the original file
    await fs.unlink(filePath);
    const fileName = path.basename(destinationPath);
    const url = `/uploads/${subFolder}/${fileName}`;
    return { url, fileName };
  } catch (err) {
    throw new Error(`Error saving file: ${err.message}`);
  }
};

const deleteFile = async (filePath) => {
  const file = path.join(__dirname, `../${filePath}`);
  console.log("filePath: " + file);
  try {
    await fs.unlink(file);
    console.log("image file deleted");
  } catch (err) {
    console.error(err);
  }
};

module.exports = {saveFile, deleteFile};

