const express = require('express');

const {
  getFlavors,
  addFlavor,
  deleteFlavor,
  updateFlavor
} = require('./controller');
const { verifyToken } = require('../utils');

const router = express.Router();

router
  .route('/')
  .get(getFlavors)
  .post(verifyToken, addFlavor);

router
  .route('/:id')
  .put(verifyToken, updateFlavor)
  .delete(verifyToken, deleteFlavor);

module.exports = router;
