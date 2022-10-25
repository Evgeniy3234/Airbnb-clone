const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Flat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, { through: models.Favorite, foreignKey: 'flatId' });
      // this.belongsToMany(models.User, { through: models.Owner, foreignKey: 'flatId' });
      // this.hasMany(models.PhotoFlat, { foreignKey: 'flatId' });
      this.hasMany(models.Booking, { foreignKey: 'flatId' });
      this.hasMany(models.Review, { foreignKey: 'flatId' });
      // this.belongsTo(models.User, { foreignKey: 'ownerId' });
    }
  }
  Flat.init({
    category: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    coordinates: DataTypes.STRING,
    type: DataTypes.STRING,
    bedsQty: DataTypes.INTEGER,
    guestsQty: DataTypes.INTEGER,
    costPerNight: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    kitchen: DataTypes.BOOLEAN,
    bathroom: DataTypes.INTEGER,
    aitConditioning: DataTypes.BOOLEAN,
    heating: DataTypes.BOOLEAN,
    wifi: DataTypes.BOOLEAN,
    pets: DataTypes.BOOLEAN,
    smoking: DataTypes.BOOLEAN,
    parking: DataTypes.TEXT,
    tv: DataTypes.BOOLEAN,
    hairdryer: DataTypes.BOOLEAN,
    washingMachine: DataTypes.BOOLEAN,
    refrigerator: DataTypes.BOOLEAN,
    stove: DataTypes.BOOLEAN,
    rating: DataTypes.REAL,
    photos: DataTypes.JSON,
    ownerId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Flat',
  });
  return Flat;
};
