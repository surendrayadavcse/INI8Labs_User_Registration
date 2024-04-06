// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8002;

app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/In18Registration', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Schema for user
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: Date, required: true }
});
const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());

// CRUD Operations
// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new user
app.post('/users', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    dob: req.body.dob
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a user
app.put('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
