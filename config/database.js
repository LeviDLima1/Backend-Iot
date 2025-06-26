const { Sequelize } = require('sequelize');
require('dotenv').config();
console.log('MYSQL_DATABASE:', process.env.MYSQLDATABASE);
console.log('MYSQL_USER:', process.env.MYSQLUSER);
console.log('MYSQL_PASSWORD:', process.env.MYSQLPASSWORD ? '***' : 'NÃO DEFINIDA');
console.log('MYSQL_HOST:', process.env.MYSQLHOST);

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

const testConnection = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connected successfully')
  } catch (error) {
    console.log('Database Connection Error |', error)
  }
}

testConnection();

module.exports = sequelize;