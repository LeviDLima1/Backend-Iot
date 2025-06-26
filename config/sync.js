const sequelize = require('./database');
require('dotenv').config();

// Importar todos os modelos para garantir que sejam sincronizados
require('../models/User');
require('../models/Pet');
require('../models/Location');

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar tabelas:', err);
  }); 