const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');

router.get('/login', AdminController.loginview);
router.post('/login/post', AdminController.loginform);
router.post('/login/cookie', AdminController.logincookie);
router.post('/many', AdminController.crawMany);
router.post('/hoctap/many', AdminController.hocTapMany);
router.post('/hoctap', AdminController.hocTap);
router.get('/', AdminController.index);
router.post('/', AdminController.craw);

module.exports = router;
