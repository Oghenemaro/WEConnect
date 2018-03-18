

module.exports = (sequelize, DataTypes) => {
  const reviews = sequelize.define('reviews', {
    review: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  reviews.associate = (models) => {
    reviews.belongsTo(models.users, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return reviews;
};
