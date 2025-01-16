// sequelize.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('apiTP', 'admin', 'Eqlulfyk38', {
  host: 'localhost',
  port: 3307,
  dialect: 'mysql',
});

module.exports = sequelize;
