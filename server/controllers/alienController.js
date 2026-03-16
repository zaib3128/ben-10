const Alien = require('../models/Alien');

// GET /api/aliens?type=X&featured=true&isUltimate=true
const getAllAliens = async (req, res) => {
  try {
    const { type, featured, isUltimate } = req.query;
    const filter = {};
    if (type)                    filter.type       = type;
    if (featured === 'true')     filter.featured   = true;
    if (isUltimate === 'true')   filter.isUltimate = true;
    if (isUltimate === 'false')  filter.isUltimate = false;
    const aliens = await Alien.find(filter).sort({ createdAt: -1 });
    res.json(aliens);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/aliens/:id
const getAlienById = async (req, res) => {
  try {
    const alien = await Alien.findById(req.params.id);
    if (!alien) return res.status(404).json({ message: 'Alien not found' });
    res.json(alien);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/aliens  (admin)
const createAlien = async (req, res) => {
  try {
    const alien = new Alien(req.body);
    const saved = await alien.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/aliens/:id  (admin)
const updateAlien = async (req, res) => {
  try {
    const alien = await Alien.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    });
    if (!alien) return res.status(404).json({ message: 'Alien not found' });
    res.json(alien);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/aliens/:id  (admin)
const deleteAlien = async (req, res) => {
  try {
    const alien = await Alien.findByIdAndDelete(req.params.id);
    if (!alien) return res.status(404).json({ message: 'Alien not found' });
    res.json({ message: 'Alien deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllAliens, getAlienById, createAlien, updateAlien, deleteAlien };
