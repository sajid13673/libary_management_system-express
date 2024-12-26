'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashPassword = async (password) => {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    };

    const users = [
      {
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'admin123',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'User 1',
        email: 'user1@gmail.com',
        password: '123456',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Hash passwords before inserting
    for (const user of users) {
      user.password = await hashPassword(user.password);
    }

    await queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};