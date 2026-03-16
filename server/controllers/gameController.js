const Game = require('../models/Game');

const getAllGames = async (req, res) => {
  try {
    const games = await Game.find().sort({ year: 1 });
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createGame = async (req, res) => {
  try {
    const game = await Game.create(req.body);
    res.status(201).json(game);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!game) return res.status(404).json({ message: 'Not found' });
    res.json(game);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteGame = async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllGames, getGameById, createGame, updateGame, deleteGame };
