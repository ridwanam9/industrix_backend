'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Todos', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT },
      completed: { type: Sequelize.BOOLEAN, defaultValue: false },
      category_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Categories', key: 'id' }
      },
      priority: { type: Sequelize.ENUM('high', 'medium', 'low') },
      due_date: { type: Sequelize.DATE },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('now') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('now') },
    });
  },
  down: (queryInterface) => queryInterface.dropTable('Todos'),
  
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
