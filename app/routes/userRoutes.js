// app/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const upload = require('../middlewares/imageUpload');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, UserController.getAllUsers);
router.get('/:id', authMiddleware, UserController.getUserById);
router.post('/', authMiddleware, upload.single('profileImage'), UserController.createUser);
router.put('/:id', authMiddleware, upload.single('profileImage'), UserController.updateUser);
router.delete('/:id', authMiddleware, UserController.deleteUser);

module.exports = router;
