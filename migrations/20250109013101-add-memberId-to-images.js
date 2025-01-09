'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addColumn('images', 'size', {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: 'url'
    },     
    );
    await queryInterface.addColumn('images', 'memberId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Members',
        key: 'id'
      },
      onDelete: 'CASCADE',
      after: 'size'
    },     
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('images','memberId');
    await queryInterface.removeColumn('images','size');
  }
};
