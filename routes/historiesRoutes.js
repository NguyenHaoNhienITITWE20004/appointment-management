const express = require('express');
const controller = require('../controllers/historiesController');
const router = express.Router();

router.get('/', controller.getAllHistories);
router.post('/', controller.createHistory);

module.exports = router;
