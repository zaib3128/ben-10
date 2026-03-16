const Favourite = require('../models/Favourite');
const mongoose  = require('mongoose');

// GET /api/favourites  — get all favourites for logged-in user
const getFavourites = async (req, res) => {
  try {
    const favs = await Favourite.find({ user: req.user._id }).populate('alien');
    res.json(favs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/favourites  — add a favourite
const addFavourite = async (req, res) => {
  try {
    const { alienId } = req.body;

    // Validate alienId exists and is a valid ObjectId
    if (!alienId) {
      return res.status(400).json({ message: 'alienId is required' });
    }
    if (!mongoose.Types.ObjectId.isValid(alienId)) {
      return res.status(400).json({ message: 'Invalid alienId format' });
    }

    // Check if already favourited
    const existing = await Favourite.findOne({ user: req.user._id, alien: alienId });
    if (existing) {
      return res.status(400).json({ message: 'Already in favourites' });
    }

    const fav = await Favourite.create({ user: req.user._id, alien: alienId });
    await fav.populate('alien');
    res.status(201).json(fav);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/favourites/:alienId  — remove a favourite
const removeFavourite = async (req, res) => {
  try {
    const { alienId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(alienId)) {
      return res.status(400).json({ message: 'Invalid alienId format' });
    }

    const fav = await Favourite.findOneAndDelete({ user: req.user._id, alien: alienId });
    if (!fav) {
      return res.status(404).json({ message: 'Favourite not found' });
    }
    res.json({ message: 'Removed from favourites' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getFavourites, addFavourite, removeFavourite };