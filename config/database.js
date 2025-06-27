const { Sequelize } = require('sequelize');

// Só carrega dotenv em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

console.log('MYSQL_DATABASE:', process.env.MYSQLDATABASE);
console.log('MYSQL_USER:', process.env.MYSQLUSER);
console.log('MYSQL_PASSWORD:', process.env.MYSQLPASSWORD ? '***' : 'NÃO DEFINIDA');
console.log('MYSQL_HOST:', process.env.MYSQLHOST);
console.log('MYSQL_PORT:', process.env.MYSQLPORT);

const sequelize = new Sequelize(
  process.env.MYSQLDATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT || 3306,
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