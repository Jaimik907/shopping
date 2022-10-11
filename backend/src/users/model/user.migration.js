module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Users', 'isActive', Sequelize.BOOLEAN);
  },
};
