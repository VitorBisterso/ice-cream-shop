const mongoose = require('mongoose');

const FlavorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Flavor must have a name'],
    unique: true
  },
  image: {
    type: String,
    required: [true, 'Flavor must have an image']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Flavor', FlavorSchema);
