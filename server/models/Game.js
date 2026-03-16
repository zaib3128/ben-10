const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    platform: { type: String, required: true },
    year: { type: Number, required: true },
    rating: { type: Number, min: 0, max: 5, default: 3.5 },
    color: { type: String, default: '#00ff88' },
    tag: { type: String, default: 'Action' },
    description: { type: String, required: true },
    thumb: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Game', gameSchema);
