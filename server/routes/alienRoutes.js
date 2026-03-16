const express = require('express');
const router = express.Router();
const { getAllAliens, getAlienById, createAlien, updateAlien, deleteAlien } = require('../controllers/alienController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/',     getAllAliens);
router.get('/:id',  getAlienById);
router.post('/',    protect, adminOnly, createAlien);
router.put('/:id',  protect, adminOnly, updateAlien);
router.delete('/:id', protect, adminOnly, deleteAlien);

module.exports = router;
