const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.MYSQLDATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    host: process.env.MYSQLHOST,
    dialect: 'mysql',
    logging: false,
  }
);
console.log('MYSQL_DATABASE:', process.env.MYSQLDATABASE);
console.log('MYSQL_USER:', process.env.MYSQLUSER);
console.log('MYSQL_PASSWORD:', process.env.MYSQLPASSWORD ? '***' : 'NÃO DEFINIDA');
console.log('MYSQL_HOST:', process.env.MYSQLHOST);

module.exports = sequelize;