const db = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = db.user;

exports.register = async (req, res) => {
    try {
      const { username, password, email, phone } = req.body;
  
      if (!username || !password || !email || !phone) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const existingUser = await db.user.findOne({ where: { username } });
      if (existingUser) {
        return res.status(409).json({ message: 'Username already exists' });
      }
  
      const user = await db.user.create({ username, password, email, phone });
  
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
      console.error('Register Error:', err);  // <== THIS LOG IS IMPORTANT
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  };
  
// Example from auth.controller.js
exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
  
      const user = await db.user.findOne({ where: { username } });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400,
      });
  
      res.status(200).json({ token, username: user.username });
    } catch (err) {
      console.error('Login Error:', err); // Logs full error
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  };
  