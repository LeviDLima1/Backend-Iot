const { Sequelize } = require('sequelize');

// Só carrega dotenv em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

console.log('MYSQL_DATABASE:', process.env.MYSQL_DATABASE);
console.log('MYSQL_USER:', process.env.MYSQL_USER);
console.log('MYSQL_PASSWORD:', process.env.MYSQL_PASSWORD ? '***' : 'NÃO DEFINIDA');
console.log('MYSQL_HOST:', process.env.MYSQL_HOST);
console.log('MYSQL_PORT:', process.env.MYSQL_PORT);

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT || 3306,
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