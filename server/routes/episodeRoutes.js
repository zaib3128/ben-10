const express = require('express');
const router = express.Router();
const { getAllEpisodes, getEpisodeById, createEpisode, updateEpisode, deleteEpisode } = require('../controllers/episodeController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/',     getAllEpisodes);
router.get('/:id',  getEpisodeById);
router.post('/',    protect, adminOnly, createEpisode);
router.put('/:id',  protect, adminOnly, updateEpisode);
router.delete('/:id', protect, adminOnly, deleteEpisode);

module.exports = router;
