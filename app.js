const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Import Routes
const usersRoutes = require('./routes/usersRoutes');
const clinicsRoutes = require('./routes/clinicsRoutes');
const allCodesRoutes = require('./routes/allCodesRoutes');
const schedulesRoutes = require('./routes/schedulesRoutes');
const doctorClinicSpecialtyRoutes = require('./routes/doctorClinicSpecialtyRoutes');
const doctorInforRoutes = require('./routes/doctorInforRoutes');
const historiesRoutes = require('./routes/historiesRoutes');
const invoicesRoutes = require('./routes/invoicesRoutes');
const markdownsRoutes = require('./routes/markdownsRoutes');
const specialtiesRoutes = require('./routes/specialtiesRoutes'); // Specialty management routes
const authRoutes = require('./routes/authRoutes'); // Authentication routes

// Import Middlewares
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

const app = express();

// Middleware Configuration
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json()); // Parse JSON request bodies
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from 'uploads'

// API Routes
app.use('/users', usersRoutes);
app.use('/clinics', clinicsRoutes);
app.use('/allcodes', allCodesRoutes);
app.use('/schedules', schedulesRoutes);
app.use('/doctor-clinic-specialty', doctorClinicSpecialtyRoutes);
app.use('/doctor-infor', doctorInforRoutes);
app.use('/histories', historiesRoutes);
app.use('/invoices', invoicesRoutes);
app.use('/markdowns', markdownsRoutes);
app.use('/specialties', specialtiesRoutes);
app.use('/auth', authRoutes);

// Centralized Error Handler Middleware
app.use(errorHandler);

// Export the app
module.exports = app;
