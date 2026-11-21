'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Books', 'isbn', {
      type: Sequelize.STRING(17), // Fits both 10/13-digit ISBNs and hyphenated formats
      allowNull: true,
      unique: true
    });

    await queryInterface.addColumn('Books', 'summary', {
      type: Sequelize.TEXT, // TEXT allows long descriptions beyond VARCHAR(255)
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Books', 'isbn');
    await queryInterface.removeColumn('Books', 'summary');
  }
};
