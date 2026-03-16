const mongoose = require('mongoose');

const alienSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    img: { type: String, required: true },
    sliderImg: { type: String, default: '' },
    type: { type: String, required: true },
    planet: { type: String, required: true },
    power: { type: Number, min: 0, max: 100, default: 70 },
    description: { type: String, required: true },
    abilities: [{ type: String }],
    accent: { type: String, default: '#00ff88' },
    background: { type: String, default: 'linear-gradient(160deg,#041a06,#0d3b1f)' },
    featured: { type: Boolean, default: false },
    series: [{ type: String }],
    // ── Ultimate Mode fields ──────────────────────────
    isUltimate:  { type: Boolean, default: false },   // true = this is an ultimate form
    baseAlien:   { type: String, default: '' },        // e.g. "Humungousaur" for Ultimate Humungousaur
  },
  { timestamps: true }
);

module.exports = mongoose.model('Alien', alienSchema);
