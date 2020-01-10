const jwt = require('jsonwebtoken');

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
// @access Protected
exports.addFlavor = (req, res) =>
  jwt.verify(req.token, process.env.JWT_SECRET_KEY, error => {
    if (error) {
      res.sendStatus(403);
    } else {
      Flavor.create(req.body)
        .then(newFlavor =>
          res.status(201).json({ success: true, data: newFlavor })
        )
        .catch(err => {
          if (err.code === 11000) {
            returnError(
              res,
              err,
              400,
              `The flavor with the name "${req.body.name}" already exists`
            );
          } else {
            returnError(res, err, 500, 'Error creating flavor');
          }
        });
    }
  });
