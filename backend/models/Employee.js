const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm' },
  name:   { type: String, required: true },
  role:   String,
  phone:  String,
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);