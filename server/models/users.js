

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    telephone: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  });
  users.associate = (models) => {
    users.hasMany(models.reviews, {
      foreignkey: 'userId',
      as: 'reviews'
    });
  };
  users.associate = (models) => {
    users.hasMany(models.businesses, {
      foreignkey: 'userId',
      as: 'businesses'
    });
  };
  users.associate = (models) => {
    users.hasMany(models.bookmarks, {
      foreignkey: 'usersId',
      as: 'bookmarks'
    });
  };
  users.associate = (models) => {
    users.belongsTo(models.locations, {
      foreignkey: 'locationId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return users;
};
