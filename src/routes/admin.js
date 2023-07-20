const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/AdminController');

router.get('/', AdminController.index);
router.post('/', AdminController.craw);
router.post('/many', AdminController.crawMany);

module.exports = router;
