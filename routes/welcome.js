const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

// POST /api/welcome
router.post('/welcome', authenticate, (req, res) => {
  const username = req.user;
  res.json({ message: `Welcome to ${username}` });
});

module.exports = router;
