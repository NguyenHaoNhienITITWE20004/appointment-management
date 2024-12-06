const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Sequelize model

// Register User
const register = async (req, res) => {
  const { email, password, firstName, lastName, address, gender, roleId, phonenumber, positionId } = req.body;

  try {
    // Validation
    if (!email || !password || !firstName || !lastName || !address || !gender || !roleId || !phonenumber) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Validate roleId
    const validRoles = ['Admin', 'Doctor', 'Patient'];
    if (!validRoles.includes(roleId)) {
      return res.status(400).json({ success: false, message: `Invalid roleId. Must be one of: ${validRoles.join(', ')}` });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      address,
      gender,
      roleId,
      phonenumber,
      positionId,
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      user: { id: newUser.id, email: newUser.email, roleId: newUser.roleId },
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password.' });
    }

    // Compare password with hashed password stored in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, roleId: user.roleId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with token and user details
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        roleId: user.roleId,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ success: false, message: 'Server error during login.' });
  }
};


module.exports = {
  register,
  login,
};
