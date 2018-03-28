module.exports = (sequelize, DataTypes) => {
  const bmark = sequelize.define('bookmarks', {
    count: {
      type: DataTypes.INTEGER,
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
  bmark.associate = (models) => {
    bmark.belongsTo(models.businesses, {
      foreignkey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  bmark.associate = (models) => {
    bmark.belongsTo(models.users, {
      foreignkey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return bmark;
};

