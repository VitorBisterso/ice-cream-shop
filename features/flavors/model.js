const mongoose = require('mongoose');

const FlavorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Flavor must have a name'],
    unique: true
  },
  color: {
    type: String,
    required: [true, 'Flavor must have a color']
  },
  price: {
    type: Number,
    min: 0,
    required: [true, 'Flavor must have a price']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Flavor', FlavorSchema);
