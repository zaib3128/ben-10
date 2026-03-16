const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    alien: { type: mongoose.Schema.Types.ObjectId, ref: 'Alien', required: true },
  },
  { timestamps: true }
);

// Prevent duplicate favourites
favouriteSchema.index({ user: 1, alien: 1 }, { unique: true });

module.exports = mongoose.model('Favourite', favouriteSchema);
