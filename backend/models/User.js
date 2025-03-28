const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['instructor', 'student'], required: true },
  firebase_uid: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('User', userSchema);