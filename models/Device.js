module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define('Device', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false }, // Ex: 'coleira', 'celular', 'tablet'
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'active' }, // 'active', 'inactive'
    userId: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'devices',
  });

  Device.associate = (models) => {
    models.User.hasMany(Device, { foreignKey: 'userId', as: 'devices' });
    Device.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Device;
}; 