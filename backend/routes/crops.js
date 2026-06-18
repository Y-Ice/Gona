const router = require('express').Router();
const Crop   = require('../models/Crop');
const auth   = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const crops = await Crop.find({ userId: req.user.id });
    res.json(crops);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const crop = await Crop.findOne({ _id: req.params.id, userId: req.user.id });
    if (!crop) return res.status(404).json({ message: 'Crop not found' });
    res.json(crop);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', auth, async (req, res) => {
  try {
    const crop = await Crop.create({ ...req.body, userId: req.user.id });
    res.status(201).json(crop);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const crop = await Crop.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!crop) return res.status(404).json({ message: 'Crop not found' });
    res.json(crop);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Crop.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: 'Crop deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;