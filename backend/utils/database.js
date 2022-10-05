const Sequelize = require('sequelize');

const sequelize = new Sequelize('shopping', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
