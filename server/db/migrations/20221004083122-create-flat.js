/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Flats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      category: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      coordinates: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      bedsQty: {
        type: Sequelize.INTEGER,
      },
      guestsQty: {
        type: Sequelize.INTEGER,
      },
      costPerNight: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.TEXT,
      },
      kitchen: {
        type: Sequelize.BOOLEAN,
      },
      bathroom: {
        type: Sequelize.INTEGER,
      },
      aitConditioning: {
        type: Sequelize.BOOLEAN,
      },
      heating: {
        type: Sequelize.BOOLEAN,
      },
      wifi: {
        type: Sequelize.BOOLEAN,
      },
      pets: {
        type: Sequelize.BOOLEAN,
      },
      smoking: {
        type: Sequelize.BOOLEAN,
      },
      parking: {
        type: Sequelize.TEXT,
      },
      tv: {
        type: Sequelize.BOOLEAN,
      },
      hairdryer: {
        type: Sequelize.BOOLEAN,
      },
      washingMachine: {
        type: Sequelize.BOOLEAN,
      },
      refrigerator: {
        type: Sequelize.BOOLEAN,
      },
      stove: {
        type: Sequelize.BOOLEAN,
      },
      rating: {
        type: Sequelize.REAL,
      },
      photos: {
        type: Sequelize.JSON,
      },
      ownerId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Users',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Flats');
  },
};
