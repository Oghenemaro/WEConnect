

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('locations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    states: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('locations')
};
