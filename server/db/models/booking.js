'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsTo(models.Flat, { foreignKey: 'flatId' });
      this.belongsTo(models.Flat, { foreignKey: 'flatId' });
    }
  }
  Booking.init({
    userId: DataTypes.INTEGER,
    flatId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    days: DataTypes.INTEGER,
    guests: DataTypes.INTEGER,
    totalCost: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};