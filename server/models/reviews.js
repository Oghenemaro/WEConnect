

module.exports = (sequelize, DataTypes) => {
  const reviews = sequelize.define('reviews', {
    review: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    businessID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    }
  });
  reviews.associate = (models) => {
    reviews.belongsTo(models.users, {
      foreignkey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  reviews.associate = (models) => {
    reviews.belongsTo(models.businesses, {
      foreignkey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return reviews;
};
