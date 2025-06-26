module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    petId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pets',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'locations',
    timestamps: false,
  });

  Location.associate = (models) => {
    models.Pet.hasMany(Location, { foreignKey: 'petId', as: 'locations' });
    Location.belongsTo(models.Pet, { foreignKey: 'petId', as: 'pet' });
  };

  return Location;
}; 