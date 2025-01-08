const { Op } = require('sequelize');
const {BlacklistToken} = require('../models');

const clearExpiredTokens = async () => {
  try {
    const now = new Date();
    await BlacklistToken.destroy({
      where: {
        expiresAt: { [Op.lt]: now }
      }
    });
    console.log('Expired tokens cleared');
  } catch (error) {
    console.error('Error clearing expired tokens:', error);
  }
};

module.exports = clearExpiredTokens;
