const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes     = require('./routes/auth');
const farmRoutes     = require('./routes/farms');
const cropRoutes     = require('./routes/crops');
const employeeRoutes = require('./routes/employees');
const activityRoutes = require('./routes/activities');

const app = express();

app.use(cors({
  origin: ['https://gona-psi.vercel.app', 'https://gona-mibt3jg1n-yakubu-isaacs-projects.vercel.app/', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Gona API is running' });
});

app.use('/api/auth',       authRoutes);
app.use('/api/farms',      farmRoutes);
app.use('/api/crops',      cropRoutes);
app.use('/api/employees',  employeeRoutes);
app.use('/api/activities', activityRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch((err) => console.log(err));