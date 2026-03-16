const express = require('express');
const router = express.Router();
const { getAllGames, getGameById, createGame, updateGame, deleteGame } = require('../controllers/gameController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/',     getAllGames);
router.get('/:id',  getGameById);
router.post('/',    protect, adminOnly, createGame);
router.put('/:id',  protect, adminOnly, updateGame);
router.delete('/:id', protect, adminOnly, deleteGame);

module.exports = router;
