const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'Ben 10 API Running' }));

let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log('✅ MongoDB Connected');
}
connectDB().catch((err) => console.error('❌ MongoDB connection error:', err.message));

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}

module.exports = app;
