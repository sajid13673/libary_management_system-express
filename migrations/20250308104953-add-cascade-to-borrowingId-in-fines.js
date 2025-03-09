'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove the existing foreign key constraint if it exists
    try {
      await queryInterface.removeConstraint('Fines', 'fines_ibfk_1');
    } catch (error) {
      console.warn("Constraint 'fines_ibfk_1' does not exist, skipping removal.");
    }

    // Add the new foreign key constraint with ON DELETE CASCADE
    await queryInterface.addConstraint('Fines', {
      fields: ['borrowingId'],
      type: 'foreign key',
      name: 'fines_ibfk_1',
      references: {
        table: 'Borrowings',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the foreign key constraint if it exists
    try {
      await queryInterface.removeConstraint('Fines', 'fines_ibfk_1');
    } catch (error) {
      console.warn("Constraint 'fines_ibfk_1' does not exist, skipping removal.");
    }

    // Add back the original foreign key constraint with ON DELETE RESTRICT
    await queryInterface.addConstraint('Fines', {
      fields: ['borrowingId'],
      type: 'foreign key',
      name: 'fines_ibfk_1',
      references: {
        table: 'Borrowings',
        field: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });
  },
};
