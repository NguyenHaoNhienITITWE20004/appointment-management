const DoctorInfor = require('../models/doctorInfor');


const Specialty = require('../models/Specialty');
const Clinic = require('../models/clinic');

exports.createDoctorInfor = async (req, res) => {
  try {
    const { doctorId, specialtyId, clinicId } = req.body;

    // Validate doctor existence
    const doctorExists = await User.findByPk(doctorId);
    if (!doctorExists) {
      return res.status(400).json({ success: false, message: `Doctor with ID ${doctorId} does not exist.` });
    }

    // Validate specialty existence
    const specialtyExists = await Specialty.findByPk(specialtyId);
    if (!specialtyExists) {
      return res.status(400).json({ success: false, message: `Specialty with ID ${specialtyId} does not exist.` });
    }

    // Validate clinic existence
    const clinicExists = await Clinic.findByPk(clinicId);
    if (!clinicExists) {
      return res.status(400).json({ success: false, message: `Clinic with ID ${clinicId} does not exist.` });
    }

    // Proceed with the insertion
    const newDoctorInfor = await DoctorInfor.create(req.body);
    res.status(201).json({ success: true, data: newDoctorInfor });
  } catch (error) {
    console.error('Error creating doctor information:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

// Get all doctor information
exports.getAll = async (req, res) => {
  try {
    const doctorInfos = await DoctorInfor.findAll();
    res.status(200).json({ success: true, data: doctorInfos });
  } catch (error) {
    console.error('Error fetching doctor information:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add new doctor information
exports.create = async (req, res) => {
  try {
    const requiredFields = [
      'doctorId',
      'priceId',
      'provinceId',
      'paymentId',
      'addressClinic',
      'nameClinic',
    ];

    // Validate required fields
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ success: false, message: `Field '${field}' is required.` });
      }
    }

    const newDoctorInfor = await DoctorInfor.create(req.body);
    res.status(201).json({ success: true, data: newDoctorInfor });
  } catch (error) {
    console.error('Error creating doctor information:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get featured doctors
exports.getFeatured = async (req, res) => {
  try {
    const featuredDoctors = await DoctorInfor.findAll({
      limit: 5, // Example: Limit to top 5 doctors
      order: [['createdAt', 'DESC']], // Optional: Order by newest
    });
    res.status(200).json({ success: true, data: featuredDoctors });
  } catch (error) {
    console.error('Error fetching featured doctors:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a specific doctor's information by ID
exports.getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await DoctorInfor.findByPk(id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor information not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.error('Error fetching doctor information by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

// Get available times for a doctor
exports.getAvailableTimes = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure the doctor exists
    const doctor = await DoctorInfor.findByPk(id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor information not found.' });
    }

    // Return success response (time handling is done on the frontend)
    res.status(200).json({ success: true, message: 'Available times can be set on the frontend.' });
  } catch (error) {
    console.error('Error fetching available times:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update doctor information
exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure the doctor exists before updating
    const doctor = await DoctorInfor.findByPk(id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor information not found.' });
    }

    await DoctorInfor.update(req.body, { where: { id } });
    const updatedDoctorInfor = await DoctorInfor.findByPk(id); // Fetch the updated record
    res.status(200).json({ success: true, data: updatedDoctorInfor });
  } catch (error) {
    console.error('Error updating doctor information:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete doctor information
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure the doctor exists before deleting
    const doctor = await DoctorInfor.findByPk(id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor information not found.' });
    }

    await DoctorInfor.destroy({ where: { id } });
    res.status(204).json({ success: true, message: 'Doctor information deleted successfully.' });
  } catch (error) {
    console.error('Error deleting doctor information:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
