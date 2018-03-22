

module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define('locations', {
    state: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  location.associate = (models) => {
    location.hasMany(models.businesses, {
      foreignkey: 'locationID',
      as: 'businesses'
    });
  };
  location.associate = (models) => {
    location.hasMany(models.users, {
      foreignkey: 'locationID',
      as: 'users'
    });
  };
  return location;
};
