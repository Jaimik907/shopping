'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init(
    {
      id: DataTypes.NUMBER,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      addressOne: DataTypes.STRING,
      addressTwo: DataTypes.STRING,
      street: DataTypes.STRING,
      email: DataTypes.STRING,
      city: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'users',
    }
  );
  return users;
};
