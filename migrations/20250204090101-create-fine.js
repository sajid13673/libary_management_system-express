'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Fines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.STRING,
        allowNull: false
      },
      days: {
        type: Sequelize.INTEGER
      },
      isPaid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      borrowingId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Borrowings',
          key: 'id'
        },
        allowNull: false,
      },
      memberId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Members',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Fines');
  }
};