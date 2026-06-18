const mongoose = require('mongoose');

const CropSchema = new mongoose.Schema({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmId:        { type: mongoose.Schema.Types.ObjectId, ref: 'Farm', required: true },
  name:          { type: String, required: true },
  plantDate:     Date,
  harvestDate:   Date,
  expectedYield: Number,
  actualYield:   Number,
  unit:          { type: String, default: 'kg' },
  status:        { type: String, enum: ['Growing', 'Harvested', 'Failed'], default: 'Growing' }
}, { timestamps: true });

module.exports = mongoose.model('Crop', CropSchema);