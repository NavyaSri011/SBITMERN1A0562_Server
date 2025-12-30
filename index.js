const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const staffRoutes = require('./routes/staffRoutes');
const managementRoutes = require('./routes/managementRoutes');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');

dotenv.config();
const app = express();

app.use(cors());

app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log(' MongoDB connected'))
  .catch((err) => console.log(err));

app.use('/api', studentRoutes);
app.use('/api', facultyRoutes);
app.use('/api', feedbackRoutes);
app.use('/api', staffRoutes);
app.use('/api', managementRoutes);
app.use('/api', authRoutes);
app.use('/api', profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
