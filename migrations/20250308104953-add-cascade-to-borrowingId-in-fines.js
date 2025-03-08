'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // removing the existing foreign key constraint
    await queryInterface.removeConstraint('Fines', 'fines_ibfk_1');

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

  async down (queryInterface, Sequelize) {
     await queryInterface.removeConstraint('Fines', 'fines_ibfk_1');
    
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
  }
};
