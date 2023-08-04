const express = require('express');
const router = express.Router();
const ApplicationController = require('../controllers/ApplicationController');
const authMiddleware = require('../middlewares/auth');

router.post('/create', authMiddleware, ApplicationController.ValidateBody, ApplicationController.create);
router.post('/update', authMiddleware, ApplicationController.ValidateBody, ApplicationController.update);
router.get('/delete/:id', authMiddleware, ApplicationController.delete);
router.get('/get_by_one/:id', authMiddleware, ApplicationController.getById);

module.exports = router;