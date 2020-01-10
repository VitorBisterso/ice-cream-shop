const express = require('express');

const { getFlavors, addFlavor } = require('./controller');

const router = express.Router();

router
  .route('/')
  .get(getFlavors)
  .post(addFlavor);

module.exports = router;
