const Flavor = require('./model');
const { returnError } = require('../utils/db');

// @desc Get all flavors
// @route GET /api/ice-creams/flavors
// @access Public
exports.getFlavors = (req, res) =>
  Flavor.find()
    .then(flavors =>
      res.status(200).json({
        success: true,
        count: flavors.length,
        data: flavors
      })
    )
    .catch(error =>
      returnError(res, error, 500, 'Error retrieving all flavors')
    );

// @desc Create a flavor
// @route POST /api/ice-creams/flavors
// @access Public
exports.addFlavor = (req, res) =>
  Flavor.create(req.body)
    .then(newFlavor => res.status(201).json({ success: true, data: newFlavor }))
    .catch(error => returnError(res, error, 500, 'Error creating flavor'));
