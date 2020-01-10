const express = require('express');

const { getFlavors, addFlavor } = require('./controller');
const { verifyToken } = require('../utils');

const router = express.Router();

router
  .route('/')
  .get(getFlavors)
  .post(verifyToken, addFlavor);

module.exports = router;
