const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  studentId: { type: String, required: true }, // Firebase UID of the student
  answers: { type: Object, required: true }, // Key-value pairs: questionId -> selectedOption
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Result', resultSchema);
