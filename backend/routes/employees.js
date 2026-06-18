const router   = require('express').Router();
const Employee = require('../models/Employee');
const auth     = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const employees = await Employee.find({ userId: req.user.id });
    res.json(employees);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const employee = await Employee.findOne({ _id: req.params.id, userId: req.user.id });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', auth, async (req, res) => {
  try {
    const employee = await Employee.create({ ...req.body, userId: req.user.id });
    res.status(201).json(employee);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const employee = await Employee.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Employee.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: 'Employee deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;