'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Movies', 'movie_genre', {
      type: Sequelize.STRING(200),
      allowNull: false,
      defaultValue: 'Unknown',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Movies', 'movie_genre');
  },
};
