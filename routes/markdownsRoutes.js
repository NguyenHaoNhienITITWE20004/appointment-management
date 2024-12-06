const express = require('express');
const controller = require('../controllers/markdownsController');
const router = express.Router();

router.get('/', controller.getAllMarkdowns);
router.post('/', controller.createMarkdown);

module.exports = router;
