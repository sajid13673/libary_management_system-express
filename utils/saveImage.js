const fs = require('fs');
const path = require('path');

/**
 * Save an image to the local file system.
 * @param {string} filePath - The path of the file to be saved.
 * @param {string} destinationPath - The destination path where the file should be saved.
 * @returns {Promise<{ url: string, fileName: string }>} - A promise that resolves with the URL and file name.
 */
const saveImage = (filePath, destinationPath) => {
  return new Promise((resolve, reject) => {
    const directory = path.dirname(destinationPath);

    // Ensure the directory exists
    fs.mkdirSync(directory, { recursive: true });

    // Create a read stream
    const readStream = fs.createReadStream(filePath);
    // Create a write stream
    const writeStream = fs.createWriteStream(destinationPath);

    readStream.on('error', (err) => {
      reject(err);
    });

    writeStream.on('error', (err) => {
      reject(err);
    });

    writeStream.on('finish', () => {
      const fileName = path.basename(destinationPath);
      const url = `/uploads/test/${fileName}`; // Update to match your directory structure
      resolve({ url, fileName });
    });

    // Pipe the file to the write stream
    readStream.pipe(writeStream);
  });
};

module.exports = saveImage;
