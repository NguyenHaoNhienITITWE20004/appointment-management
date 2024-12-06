const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a Sequelize instance
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: 'mysql',  // You are using MySQL
  logging: false,    // Disable SQL query logging (can be enabled for debugging)
  pool: {
    max: 10,          // Maximum number of connections in the pool
    min: 0,           // Minimum number of connections in the pool
    acquire: 30000,   // Maximum time, in milliseconds, that pool will try to get a connection before throwing an error
    idle: 10000,      // Maximum time, in milliseconds, that a connection can be idle before being released
  },
});

// Test database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the MySQL database.');
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);  // Exit the process if the connection fails
  }
})();

module.exports = sequelize;
