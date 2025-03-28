const Result = require('../models/Result');

// Save or update results for a student
exports.saveResult = async (req, res) => {
  const { studentId, answers } = req.body;

  try {
    // Check if the user has already submitted answers
    const existingResult = await Result.findOne({ studentId });

    if (existingResult) {
      // Check if any of the questions in the new submission already exist in the database
      const duplicateQuestions = Object.keys(answers).filter(
        (questionId) => existingResult.answers[questionId]
      );

      if (duplicateQuestions.length > 0) {
        return res.status(400).json({
          error: 'You have already submitted answers for some questions.',
          duplicateQuestions, // Return the IDs of duplicate questions
        });
      }

      // Merge new answers with existing answers
      existingResult.answers = { ...existingResult.answers, ...answers };
      await existingResult.save();
      return res.status(200).json({ message: 'Answers updated successfully' });
    }

    // If no existing result, create a new one
    const result = new Result({ studentId, answers });
    await result.save();
    res.status(201).json({ message: 'Answers submitted successfully' });
  } catch (err) {
    console.error('Error saving result:', err);
    res.status(500).json({ error: err.message });
  }
};

// Fetch results for a specific student
exports.getResult = async (req, res) => {
  const { studentId } = req.query;

  try {
    const result = await Result.findOne({ studentId });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'No results found for this user.' });
    }
  } catch (err) {
    console.error('Error fetching results:', err);
    res.status(500).json({ error: err.message });
  }
};