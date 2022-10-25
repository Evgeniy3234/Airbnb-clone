const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Flat, { through: models.Favorite, foreignKey: 'userId' });
      // this.belongsToMany(models.Flat, { through: models.Owner, foreignKey: 'userId' });
      this.hasMany(models.Booking, { foreignKey: 'userId' });
      this.hasMany(models.Review, { foreignKey: 'userId' });
      this.hasOne(models.Token, { foreignKey: 'userId' });
      // this.hasMany(models.Flat, { foreignKey: 'ownerId' });
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    picture: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
