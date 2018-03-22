module.exports = (sequelize, DataTypes) => {
  const bmark = sequelize.define('bookmarks', {
    count: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  bmark.associate = (models) => {
    bmark.belongsTo(models.businesses, {
      foreignkey: 'businessID',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  bmark.associate = (models) => {
    bmark.belongsTo(models.users, {
      foreignkey: 'userID',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return bmark;
};

