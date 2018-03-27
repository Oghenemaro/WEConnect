'strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      telephone: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      locationID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'locations',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    }),
  down: queryInterface => queryInterface.dropTable('users'),
};
