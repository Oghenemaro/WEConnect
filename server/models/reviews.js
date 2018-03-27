

module.exports = (sequelize, DataTypes) => {
  const reviews = sequelize.define('reviews', {
    review: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  reviews.associate = (models) => {
    reviews.belongsTo(models.users, {
      foreignkey: 'userID',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  reviews.associate = (models) => {
    reviews.belongsTo(models.businesses, {
      foreignkey: 'businessID',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return reviews;
};
