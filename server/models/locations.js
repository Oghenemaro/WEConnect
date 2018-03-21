

module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define('locations', {
    states: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });
  location.associate = (models) => {
    location.hasMany(models.businesses, {
      foreignkey: 'locationId',
      as: 'businesses'
    });
  };
  location.associate = (models) => {
    location.hasMany(models.users, {
      foreignkey: 'locationId',
      as: 'users'
    });
  };
  return location;
};
