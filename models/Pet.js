const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Pet = sequelize.define('Pet', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  breed: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  age: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  macId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  owner: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastUpdate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isOnline: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  homeArea: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  location: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'pets',
});

User.hasMany(Pet, { foreignKey: 'userId', as: 'pets' });
Pet.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Pet; 