const express = require('express');
const router = express.Router();
const upload = require('../utils/fileUpload');
const AdminController = require('../controllers/AdminController');
const authMiddleware = require('../middlewares/auth');

router.route('/register')
.post(upload.single('avatar'), AdminController.ValidateBody, AdminController.registerAdmin);

router.route('/login')
.post(AdminController.ValidateLogin, AdminController.loginAdmin);

router.route('/update')
.post(upload.single('avatar'), authMiddleware, AdminController.ValidateBody, AdminController.update);

router.get('/logout', AdminController.logoutAdmin);
router.get('/get_all', authMiddleware, AdminController.getAll);
router.get('/delete/:id', authMiddleware, AdminController.delete);
router.get('/get_by_one/:id', authMiddleware, AdminController.getById);

module.exports = router;