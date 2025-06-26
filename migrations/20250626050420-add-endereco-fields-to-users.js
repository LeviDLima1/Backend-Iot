'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'cep', Sequelize.STRING);
    await queryInterface.addColumn('users', 'rua', Sequelize.STRING);
    await queryInterface.addColumn('users', 'numero', Sequelize.STRING);
    await queryInterface.addColumn('users', 'bairro', Sequelize.STRING);
    await queryInterface.addColumn('users', 'cidade', Sequelize.STRING);
    await queryInterface.addColumn('users', 'estado', Sequelize.STRING);
    await queryInterface.addColumn('users', 'complemento', Sequelize.STRING);
    await queryInterface.addColumn('users', 'bio', Sequelize.STRING);
    await queryInterface.addColumn('users', 'phone', Sequelize.STRING);
    await queryInterface.addColumn('users', 'avatar', Sequelize.TEXT);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'cep');
    await queryInterface.removeColumn('users', 'rua');
    await queryInterface.removeColumn('users', 'numero');
    await queryInterface.removeColumn('users', 'bairro');
    await queryInterface.removeColumn('users', 'cidade');
    await queryInterface.removeColumn('users', 'estado');
    await queryInterface.removeColumn('users', 'complemento');
    await queryInterface.removeColumn('users', 'bio');
    await queryInterface.removeColumn('users', 'phone');
    await queryInterface.removeColumn('users', 'avatar');
  }
};