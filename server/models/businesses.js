
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
    locationID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    categoryID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
  });
  businesses.associate = (models) => {
    businesses.hasMany(models.reviews, {
      foreignkey: 'id'
    });
  };
  businesses.associate = (models) => {
    businesses.hasMany(models.bookmarks, {
      foreignkey: 'id'
    });
  };
  businesses.associate = (models) => {
    businesses.belongsTo(models.categories, {
      foreignkey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  businesses.associate = (models) => {
    businesses.belongsTo(models.locations, {
      foreignkey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  businesses.associate = (models) => {
    businesses.belongsTo(models.users, {
      foreignkey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return businesses;
};
