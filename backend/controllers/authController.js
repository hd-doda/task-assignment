const User = require('../models/User');

exports.saveUser = async (req, res) => {
  const { email, role, firebase_uid } = req.body;
  try {
    const user = new User({ email, role, firebase_uid });
    await user.save();
    res.status(201).json({ message: 'User saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserRole = async (req, res) => {
  const { firebase_uid } = req.query;
  try {
    const user = await User.findOne({ firebase_uid });
    if (user) {
      res.status(200).json({ role: user.role });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};