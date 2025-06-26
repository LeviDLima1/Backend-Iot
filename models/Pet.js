module.exports = (sequelize, DataTypes) => {
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
  }, {
    tableName: 'pets',
  });

  Pet.associate = (models) => {
    models.User.hasMany(Pet, { foreignKey: 'userId', as: 'pets' });
    Pet.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Pet;
}; 