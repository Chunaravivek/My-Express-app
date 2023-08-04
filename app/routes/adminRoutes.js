const express = require('express');
const router = express.Router();
const upload = require('../utils/fileUpload');
const AdminController = require('../controllers/AdminController');

router.route('/register')
.post(upload.single('avatar'), AdminController.ValidateBody, AdminController.registerAdmin);

router.route('/login')
.post(AdminController.ValidateLogin, AdminController.loginAdmin);

router.get('/logout', AdminController.logoutAdmin);

module.exports = router;