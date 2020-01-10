const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'User must have an email'],
    unique: true
  },
  name: {
    type: String,
    required: [true, 'User must have a name']
  },
  password: {
    type: String,
    required: [true, 'User must have a password']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
