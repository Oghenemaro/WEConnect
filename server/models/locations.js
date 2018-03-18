

module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define('locations', {
    states: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  location.associate = (models) => {
    location.hasMany(models.businesses, {
      foreignkey: 'id'
    });
  };
  location.associate = (models) => {
    location.hasMany(models.users, {
      foreignkey: 'id'
    });
  };
  return location;
};
