

module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    categories: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  category.associate = (models) => {
    category.hasMany(models.businesses, {
      foreignkey: 'id'
    });
  };
  return category;
};
