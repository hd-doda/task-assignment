const express = require('express');
const questionController = require('../controllers/questionController');

const router = express.Router();

router.post('/create-question', questionController.createQuestion);
router.get('/get-questions', questionController.getQuestions);

module.exports = router;