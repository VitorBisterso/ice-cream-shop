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
      return res.sendStatus(403);
    }
    Flavor.create(req.body)
      .then(newFlavor =>
        res.status(201).json({ success: true, data: newFlavor })
      )
      .catch(err => {
        if (err.code === 11000) {
          return returnError(
            res,
            err,
            400,
            `The flavor with the name "${req.body.name}" already exists`
          );
        }
        return returnError(res, err, 500, 'Error creating flavor');
      });
  });

// @desc Update a flavor
// @route PUT /api/ice-creams/flavors/:id
// @access Protected
exports.updateFlavor = (req, res) =>
  jwt.verify(req.token, process.env.JWT_SECRET_KEY, error => {
    if (error) {
      return res.sendStatus(403);
    }
    const { id } = req.params;
    const filter = { _id: id };
    const update = { ...req.body };
    return Flavor.findOneAndUpdate(filter, update, { new: true })
      .then(updatedFlavor => {
        if (updatedFlavor)
          return res.json({ success: true, data: updatedFlavor });

        const errorMessage = `The flavor with the id ${id} does not exist`;
        return returnError(res, errorMessage, 404, errorMessage);
      })
      .catch(err => returnError(res, err, 500, 'Error updating flavor'));
  });

// @desc Delete a flavor by its id
// @route DELETE /api/ice-creams/flavors/:id
// @access Protected
exports.deleteFlavor = (req, res) =>
  jwt.verify(req.token, process.env.JWT_SECRET_KEY, error => {
    if (error) {
      return res.sendStatus(403);
    }
    const { id } = req.params;
    const filter = { _id: id };
    return Flavor.findOneAndDelete(filter)
      .then(deletedFlavor => {
        if (deletedFlavor)
          return res.json({ success: true, data: deletedFlavor });

        const errorMessage = `The flavor with the id ${id} does not exist`;
        return returnError(res, errorMessage, 404, errorMessage);
      })
      .catch(err => returnError(res, err, 500, 'Error updating flavor'));
  });
