const router = require('express').Router();
const Farm   = require('../models/Farm');
const auth   = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const farms = await Farm.find({ userId: req.user.id });
    res.json(farms);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const farm = await Farm.findOne({ _id: req.params.id, userId: req.user.id });
    if (!farm) return res.status(404).json({ message: 'Farm not found' });
    res.json(farm);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', auth, async (req, res) => {
  try {
    const farm = await Farm.create({ ...req.body, userId: req.user.id });
    res.status(201).json(farm);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const farm = await Farm.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!farm) return res.status(404).json({ message: 'Farm not found' });
    res.json(farm);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Farm.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: 'Farm deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;