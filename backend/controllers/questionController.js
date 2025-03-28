const Question = require('../models/Question');

exports.createQuestion = async (req, res) => {
  const { question_text, options, correct_answer } = req.body;
  try {
    const question = new Question({ question_text, options, correct_answer });
    await question.save();
    res.status(201).json({ message: 'Question created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};