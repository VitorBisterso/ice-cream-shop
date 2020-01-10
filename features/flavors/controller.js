const Flavor = require('./model');
const { returnError } = require('../utils');

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
    .catch(error => {
      if (error.code === 11000) {
        returnError(
          res,
          error,
          400,
          `The flavor with the name "${req.body.name}" already exists`
        );
      } else {
        returnError(res, error, 500, 'Error creating flavor');
      }
    });
