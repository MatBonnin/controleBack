const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Miel = sequelize.define('Miel', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Assure l'unicité de l'email
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prix: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Miel;
