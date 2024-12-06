const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming your Sequelize instance is configured here

const Schedule = sequelize.define('Schedule', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  timeFrame: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // Enables `createdAt` and `updatedAt`
  tableName: 'schedules', // Matches the SQL table name
});

module.exports = Schedule;
