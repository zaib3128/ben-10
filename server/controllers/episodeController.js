const Episode = require('../models/Episode');

const getAllEpisodes = async (req, res) => {
  try {
    const episodes = await Episode.find().sort({ seriesNumber: 1 });
    res.json(episodes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEpisodeById = async (req, res) => {
  try {
    const ep = await Episode.findById(req.params.id);
    if (!ep) return res.status(404).json({ message: 'Episode series not found' });
    res.json(ep);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createEpisode = async (req, res) => {
  try {
    const ep = await Episode.create(req.body);
    res.status(201).json(ep);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateEpisode = async (req, res) => {
  try {
    const ep = await Episode.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ep) return res.status(404).json({ message: 'Not found' });
    res.json(ep);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteEpisode = async (req, res) => {
  try {
    await Episode.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllEpisodes, getEpisodeById, createEpisode, updateEpisode, deleteEpisode };
