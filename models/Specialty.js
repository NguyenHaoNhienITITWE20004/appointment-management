// models/Specialty.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');  // or wherever your Sequelize instance is

const Specialty = sequelize.define('Specialty', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'specialties',
  timestamps: true,
});

module.exports = Specialty;
