const express = require('express');
const auth = require('../middleware/auth');

const router = new express.Router();

router.get('/testme', async (req, res) => {
  res.send('Hello From Test');
});

router.get('/test/secure', auth, async (req, res) => {
  res.send('Congratulations! You are authenticated');
});

module.exports = router;
