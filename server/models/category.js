

module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('categories', {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });
  category.associate = (models) => {
    category.hasMany(models.businesses, {
      foreignkey: 'categoryId',
      as: 'businesses'
    });
  };
  return category;
};
