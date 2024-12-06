const express = require('express');
const allCodesController = require('../controllers/allCodesController');
const router = express.Router();

router.get('/', allCodesController.getAllCodes);

module.exports = router;
