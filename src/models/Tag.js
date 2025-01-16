const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Tag = sequelize.define('Tag', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Assure l'unicité de l'email
  },
});

Tag.belongsToMany(require('./Miel'), { through: 'MielTag' });

module.exports = Tag;
