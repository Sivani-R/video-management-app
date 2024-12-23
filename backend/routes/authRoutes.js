const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  console.log("Register route hit:", req.body); 
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    console.log("User registered:", user); 
    res.status(201).send('User registered');
  } catch (err) {
    console.error("Error registering user:", err); 
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  console.log("Login route hit:", req.body); 
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid email or password');
    }
    const token = user.generateAuthToken();
    res.send({ token });
  } catch (err) {
    console.error("Error logging in user:", err); 
    res.status(400).send(err);
  }
});

module.exports = router;
