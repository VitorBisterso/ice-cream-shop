const bcrypt = require('bcryptjs');

const User = require('./model');
const { returnError } = require('../utils');

// @desc Register
// @route POST /api/users/register
// @access Public
exports.register = (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({
    name,
    email,
    password
  });

  bcrypt.genSalt(10, (error, salt) => {
    if (newUser.password && newUser.password.length < 5) {
      return returnError(
        res,
        null,
        400,
        'Password must be at least 5 characters long'
      );
    }
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      newUser
        .save()
        .then(user => res.json({ success: true, data: user }))
        .catch(e => {
          if (e.code === 11000) {
            returnError(
              res,
              e,
              400,
              `The user with the email "${email}" already exists`
            );
          } else {
            returnError(res, e, 500, 'Error creating user');
          }
        });
    });
  });
};
