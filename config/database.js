const { Sequelize } = require('sequelize');
require('dotenv').config();
console.log('MYSQL_DATABASE:', process.env.MYSQLDATABASE);
console.log('MYSQL_USER:', process.env.MYSQLUSER);
console.log('MYSQL_PASSWORD:', process.env.MYSQLPASSWORD ? '***' : 'NÃO DEFINIDA');
console.log('MYSQL_HOST:', process.env.MYSQLHOST);

const MYSQL_DATABASE = process.env.MYSQLDATABASE
const MYSQL_USER = process.env.MYSQLUSER
const MYSQL_PASSWORD = process.env.MYSQLPASSWORD
const MYSQL_HOST = process.env.MYSQLHOST


const sequelize = new Sequelize(
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  {
    host: MYSQL_HOST,
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