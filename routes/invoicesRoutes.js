const express = require('express');
const controller = require('../controllers/invoicesController');
const router = express.Router();

router.get('/', controller.getAllInvoices);
router.post('/', controller.createInvoice);

module.exports = router;
