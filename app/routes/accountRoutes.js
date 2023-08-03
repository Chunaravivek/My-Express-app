const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/AccountController');
const authMiddleware = require('../middlewares/auth');

router.post('/create', authMiddleware, AccountController.ValidateBody, AccountController.create);
router.post('/update', authMiddleware, AccountController.ValidateBody, AccountController.update);
router.get('/delete/:id', authMiddleware, AccountController.delete);
router.get('/get_by_one/:id', authMiddleware, AccountController.getById);

module.exports = router;
