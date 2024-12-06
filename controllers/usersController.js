const User = require('../models/User'); // Sequelize model
const bcrypt = require('bcrypt');

// Role mappings (string to number) for consistency with the backend
const roleMapping = {
  Admin: 1,
  Doctor: 2,
  Patient: 3,
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // Sequelize's findAll method to fetch all users
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch users.' });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName, address, gender, roleId, phoneNumber, position } = req.body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !address || !gender || !roleId || !phoneNumber) {
      return res.status(400).json({ success: false, message: 'All required fields must be provided.' });
    }

    // Map roleId (string) to numeric value
    const mappedRoleId = roleMapping[roleId];
    if (!mappedRoleId) {
      return res.status(400).json({ success: false, message: 'Invalid role. Must be Admin, Doctor, or Patient.' });
    }

    // Validate gender
    const validGenders = ['male', 'female', 'other'];
    if (!validGenders.includes(gender.toLowerCase())) {
      return res.status(400).json({ success: false, message: 'Invalid gender. Must be male, female, or other.' });
    }

    // Check for duplicate email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User with this email already exists.' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare user data
    const userData = {
      email,
      password: hashedPassword, // Store hashed password
      firstName,
      lastName,
      address,
      gender: gender.toLowerCase(),
      roleId: mappedRoleId, // Use numeric roleId
      phonenumber: phoneNumber, // Ensure consistent naming
      positionId: position || null,
      image: req.file ? `/uploads/${req.file.filename}` : null, // Handle image file upload
    };

    // Create the user in the database
    const newUser = await User.create(userData);

    // Send response with created user
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ success: false, message: 'Failed to create user.' });
  }
};


// Update an existing user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { roleId, email, password, firstName, lastName, address, gender, phoneNumber, position } = req.body;

    // Validate roleId (if provided)
    if (roleId && !roleMapping[roleId]) {
      return res.status(400).json({ success: false, message: 'Invalid role. Must be Admin, Doctor, or Patient.' });
    }

    // Fetch the existing user by ID
    const existingUser = await User.findByPk(id); // Sequelize's findByPk method to fetch user by primary key (ID)
    if (!existingUser) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Prepare data for update
    const updatedData = {
      email: email || existingUser.email,
      password: password || existingUser.password, // Keep the old password if not provided
      firstName: firstName || existingUser.firstName,
      lastName: lastName || existingUser.lastName,
      address: address || existingUser.address,
      gender: gender || existingUser.gender,
      roleId: roleId || existingUser.roleId, // Update roleId (if provided)
      phoneNumber: phoneNumber || existingUser.phoneNumber,
      positionId: position || existingUser.positionId,
      image: req.file ? `/uploads/${req.file.filename}` : existingUser.image, // Handle image file upload
    };

    // Update the user
    await existingUser.update(updatedData); // Sequelize's update method for updating records

    // Send updated user back in response
    const updatedUser = await User.findByPk(id); // Fetch the updated user
    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, message: 'Failed to update user.' });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // Get the user ID from the URL parameters

    // Check if the user exists
    const userExists = await User.findByPk(id); // Sequelize's findByPk method to fetch user by ID
    if (!userExists) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Delete the user
    await userExists.destroy(); // Sequelize's destroy method for deleting a record
    res.status(200).json({ success: true, message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: 'Failed to delete user.' });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
};
