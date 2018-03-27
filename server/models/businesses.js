
module.exports = (sequelize, DataTypes) => {
  const businesses = sequelize.define('businesses', {
    business_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    business_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    business_address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    business_category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  businesses.associate = (models) => {
    businesses.hasMany(models.reviews, {
      foreignkey: 'businessID'
    });
  };
  businesses.associate = (models) => {
    businesses.hasMany(models.bookmarks, {
      foreignkey: 'businessID'
    });
  };
  businesses.associate = (models) => {
    businesses.belongsTo(models.categories, {
      foreignkey: 'categoryID',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  businesses.associate = (models) => {
    businesses.belongsTo(models.locations, {
      foreignkey: 'locationID',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  businesses.associate = (models) => {
    businesses.belongsTo(models.users, {
      foreignkey: 'userID',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return businesses;
};
