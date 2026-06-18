const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmId:      { type: mongoose.Schema.Types.ObjectId, ref: 'Farm' },
  employeeId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  date:        { type: Date, default: Date.now },
  type:        { type: String, enum: ['Planting','Fertilizing','Weeding','Irrigation','Pest Control','Feeding','Harvesting','Other'] },
  description: String,
  inputs:      [{ name: String, qty: Number, unit: String }]
}, { timestamps: true });

module.exports = mongoose.model('Activity', ActivitySchema);