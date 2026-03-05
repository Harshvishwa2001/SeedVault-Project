const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    contact: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    seedName: { type: String, required: true },
    seedVariety: { type: String },
    status: { type: String, default: 'Pending' }, // For Admin Dashboard
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);