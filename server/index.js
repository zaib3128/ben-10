const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const alienRoutes     = require('./routes/alienRoutes');
const episodeRoutes   = require('./routes/episodeRoutes');
const gameRoutes      = require('./routes/gameRoutes');
const authRoutes      = require('./routes/authRoutes');
const favouriteRoutes = require('./routes/favouriteRoutes');

app.use('/api/aliens',     alienRoutes);
app.use('/api/episodes',   episodeRoutes);
app.use('/api/games',      gameRoutes);
app.use('/api/auth',       authRoutes);
app.use('/api/favourites', favouriteRoutes);

// Serve static client in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'Ben 10 API Running' }));

// Connect MongoDB then start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
