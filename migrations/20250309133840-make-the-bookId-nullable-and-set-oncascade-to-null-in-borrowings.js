'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Borrowings', 'bookId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    // Remove the existing constraint
    await queryInterface.removeConstraint('Borrowings', 'borrowings_ibfk_1');

    await queryInterface.addConstraint('Borrowings', {
      fields: ['bookId'],
      type: 'foreign key',
      name: 'borrowings_ibfk_1',
      references: {
        table: 'Books',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Borrowings', 'borrowings_ibfk_1');

    await queryInterface.changeColumn('Borrowings', 'bookId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.addConstraint('Borrowings', {
      fields: ['bookId'],
      type: 'foreign key',
      name: 'borrowings_ibfk_1',
      references: {
        table: 'Books',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
};
