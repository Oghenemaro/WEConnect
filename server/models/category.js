

module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('categories', {
    category: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  category.associate = (models) => {
    category.hasMany(models.businesses, {
      foreignkey: 'categoryID'
    });
  };
  return category;
};
