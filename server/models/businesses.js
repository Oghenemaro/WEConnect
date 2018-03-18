

module.exports = (sequelize, DataTypes) => {
  const businesses = sequelize.define('businesses', {
    business_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    business_description: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    business_address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    business_category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    business_location: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  businesses.associate = (models) => {
    businesses.hasMany(models.reviews, {
      foreignkey: 'id'
    });
  };
  businesses.associate = (models) => {
    businesses.belongsTo(models.category, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  businesses.associate = (models) => {
    businesses.belongsTo(models.locations, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  businesses.associate = (models) => {
    businesses.belongsTo(models.users, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return businesses;
};
