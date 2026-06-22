const mongoose = require('mongoose');

const FarmSchema = new mongoose.Schema({
  userId:         { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:           { type: String, required: true },
  location:       String,
  coordinates: {
    latitude:  Number,
    longitude: Number,
  },
  size:           Number,
  unit:           { type: String, default: 'hectares' },
  specialization: String,
  status:         { type: String, enum: ['Active', 'Inactive', 'Dormant'], default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Farm', FarmSchema);