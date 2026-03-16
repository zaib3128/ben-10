const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema(
  {
    seriesTitle: { type: String, required: true },
    seriesNumber: { type: Number, required: true },
    year: { type: String, required: true },
    totalEpisodes: { type: Number, required: true },
    color: { type: String, default: '#00ff88' },
    badge: { type: String, default: 'Classic' },
    description: { type: String, required: true },
    highlights: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Episode', episodeSchema);
