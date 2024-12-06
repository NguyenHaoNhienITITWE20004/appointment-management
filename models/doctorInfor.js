const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const DoctorInfor = sequelize.define(
  'doctor_infor',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'doctorId', // Match the database column name exactly
    },
    specialtyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'specialtyId',
    },
    clinicId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'clinicId',
    },
    priceId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'priceId',
    },
    provinceId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'provinceId',
    },
    paymentId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'paymentId',
    },
    addressClinic: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'addressClinic',
    },
    nameClinic: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'nameClinic',
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'note',
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'count',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'createdAt',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updatedAt',
    },
  },
  {
    tableName: 'doctor_infor', // Explicit table name
    timestamps: true, // Enable createdAt and updatedAt fields
    underscored: false, // Disable default snake_case conversion
  }
);

module.exports = DoctorInfor;
