

module.exports = (sequelize, DataTypes) => {
  const reviews = sequelize.define('reviews', {
    review: {
      type: DataTypes.STRING,
      allowNull: false
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  reviews.associate = (models) => {
    reviews.belongsTo(models.users, {
      foreignkey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  reviews.associate = (models) => {
    reviews.belongsTo(models.businesses, {
      foreignkey: 'businessId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return reviews;
};
