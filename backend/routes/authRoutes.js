const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/save-user', authController.saveUser);
router.get('/get-user-role', authController.getUserRole);

module.exports = router;