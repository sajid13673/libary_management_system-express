const crypto = require('crypto');

/**
 * Generates a cryptographically secure random password
 * @param {number} length - Length of the generated password (default 12)
 * @returns {string} - The generated temporary password
 */
const generateTemporaryPassword = (length = 12) => {
  // Omit look-alike characters (o, 0, i, l, 1, O, I) to make it highly user-friendly
  const allowedChars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%&*';
  const charsLength = allowedChars.length;
  
  let password = '';
  // Loop and securely pick random indices from our safe character list
  while (password.length < length) {
    const randomByte = crypto.randomBytes(1)[0];
    if (randomByte < 256 - (256 % charsLength)) {
      password += allowedChars[randomByte % charsLength];
    }
  }
  
  return password;
};

module.exports = { generateTemporaryPassword };
