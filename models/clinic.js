const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Clinic = sequelize.define('clinic', {
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    descriptionMarkdown: { type: DataTypes.TEXT },
    descriptionHTML: { type: DataTypes.TEXT },
    image: { type: DataTypes.BLOB }
}, { timestamps: true });

module.exports = Clinic;
