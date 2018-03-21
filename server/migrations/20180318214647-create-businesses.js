

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('businesses', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    business_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    business_description: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    business_address: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    business_category: {
      type: Sequelize.STRING,
      allowNull: false
    },
    business_location: {
      type: Sequelize.STRING,
      allowNull: false
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
  down: queryInterface => queryInterface.dropTable('businesses'),
};
