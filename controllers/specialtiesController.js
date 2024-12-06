const path = require('path'); // For handling file paths
const Specialty = require('../models/Specialty'); // Correct model import

// Add a new specialty
const addSpecialty = async (req, res) => {
  const { name, description } = req.body;
  const imagePath = req.file ? `uploads/${req.file.filename}` : null;

  try {
    // Validation
    if (!name || !description || !imagePath) {
      return res.status(400).json({
        success: false,
        message: 'Name, description, and image are required.',
      });
    }

    // Create a new specialty using Sequelize
    const newSpecialty = await Specialty.create({
      name,
      description,
      image: imagePath,
    });

    res.status(201).json({
      success: true,
      message: 'Specialty added successfully.',
      data: newSpecialty,
    });
  } catch (error) {
    console.error('Error adding specialty:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add specialty. Please check the server logs for details.',
    });
  }
};

// Get all specialties
const getSpecialties = async (req, res) => {
  try {
    // Fetch all specialties from the database
    const specialties = await Specialty.findAll({
      order: [['createdAt', 'DESC']],  // Order by createdAt descending
    });

    res.status(200).json({
      success: true,
      message: 'Specialties fetched successfully.',
      data: specialties,
    });
  } catch (error) {
    console.error('Error fetching specialties:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch specialties. Please check the server logs for details.',
    });
  }
};

// Get a specialty by ID
const getSpecialtyById = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid specialty ID.',
      });
    }

    // Find specialty by ID
    const specialty = await Specialty.findByPk(id);

    if (!specialty) {
      return res.status(404).json({
        success: false,
        message: 'Specialty not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Specialty fetched successfully.',
      data: specialty,
    });
  } catch (error) {
    console.error('Error fetching specialty by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch specialty. Please check the server logs for details.',
    });
  }
};

// Update a specialty
const updateSpecialty = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const imagePath = req.file ? path.join('uploads', req.file.filename) : null;

  try {
    // Find specialty by ID
    const specialty = await Specialty.findByPk(id);

    if (!specialty) {
      return res.status(404).json({
        success: false,
        message: 'Specialty not found.',
      });
    }

    // Update fields if provided
    if (name) specialty.name = name;
    if (description) specialty.description = description;
    if (imagePath) specialty.image = imagePath;

    // Save the updated specialty
    await specialty.save();

    res.status(200).json({
      success: true,
      message: 'Specialty updated successfully.',
      data: specialty,  // Return the updated specialty
    });
  } catch (error) {
    console.error('Error updating specialty:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update specialty. Please check the server logs for details.',
    });
  }
};

// Delete a specialty
const deleteSpecialty = async (req, res) => {
  const { id } = req.params;

  try {
    // Find specialty by ID
    const specialty = await Specialty.findByPk(id);

    if (!specialty) {
      return res.status(404).json({
        success: false,
        message: 'Specialty not found.',
      });
    }

    // Delete the specialty
    await specialty.destroy();

    res.status(200).json({
      success: true,
      message: 'Specialty deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting specialty:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete specialty. Please check the server logs for details.',
    });
  }
};

module.exports = {
  addSpecialty,
  getSpecialties,
  getSpecialtyById,
  updateSpecialty,
  deleteSpecialty,
};
