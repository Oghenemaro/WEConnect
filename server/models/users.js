

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
    locationID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    }
  });
  users.associate = (models) => {
    users.hasMany(models.reviews, {
      foreignkey: 'id'
    });
  };
  users.associate = (models) => {
    users.hasMany(models.businesses, {
      foreignkey: 'id'
    });
  };
  users.associate = (models) => {
    users.hasMany(models.bookmarks, {
      foreignkey: 'id'
    });
  };
  users.associate = (models) => {
    users.belongsTo(models.locations, {
      foreignkey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return users;
};
