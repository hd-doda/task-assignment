const express = require('express');
const resultController = require('../controllers/resultController');

const router = express.Router();

router.post('/save-result', resultController.saveResult);
router.get('/get-result', resultController.getResult); // Add this line

module.exports = router;