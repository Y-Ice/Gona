const router   = require('express').Router();
const Activity = require('../models/Activity');
const auth     = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.user.id });
    res.json(activities);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const activity = await Activity.findOne({ _id: req.params.id, userId: req.user.id });
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json(activity);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', auth, async (req, res) => {
  try {
    const activity = await Activity.create({ ...req.body, userId: req.user.id });
    res.status(201).json(activity);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const activity = await Activity.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json(activity);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Activity.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: 'Activity deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;