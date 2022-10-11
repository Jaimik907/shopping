const Sequelize = require('sequelize');
const sequelize = require('../../../utils/database');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  addressOne: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  addressTwo: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  street: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  lastLogin: {
    type: Sequelize.TIMESTAMP,
    allowNull: false,
  },
});

module.exports = User;
