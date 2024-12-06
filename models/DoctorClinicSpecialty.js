const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Doctor = require('./User'); // Import Doctor (User with roleId = 'Doctor')
const Clinic = require('./Clinic');
const Specialty = require('./Specialty');

const DoctorClinicSpecialty = sequelize.define('DoctorClinicSpecialty', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  doctorId: {
    type: DataTypes.INTEGER,
    references: {
      model: Doctor,
      key: 'id',
    },
    allowNull: false,
  },
  clinicId: {
    type: DataTypes.INTEGER,
    references: {
      model: Clinic,
      key: 'id',
    },
    allowNull: false,
  },
  specialtyId: {
    type: DataTypes.INTEGER,
    references: {
      model: Specialty,
      key: 'id',
    },
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  tableName: 'doctor_clinic_specialty',
  timestamps: true,
});

module.exports = DoctorClinicSpecialty;
