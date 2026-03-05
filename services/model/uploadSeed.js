const mongoose = require('mongoose');

const seedSchema = new mongoose.Schema({
    name: { type: String, required: true },
    variety: { type: String, required: true },
    location: { type: String, required: true },
    season: { type: String, required: true },
    yield: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    tag: { type: String, default: 'In Stock' },
    category: { type: String, required: true },
    image: { type: String, required: true }, // URL from Cloudinary
    depth: { type: String, required: true },
    maturity: { type: String, required: true },
    water: { type: String, enum: ['Low', 'Moderate', 'High'], default: 'Low' },
    purity: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Seed', seedSchema);