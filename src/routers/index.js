const express = require('express');
const auth = require('../middleware/auth');

const router = new express.Router();

router.get('/testme', async (req, res) => {
  res.send('Hello From Test');
});

module.exports = router;
