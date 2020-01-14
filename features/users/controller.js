const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./model');
const { returnError } = require('../utils');

// @desc Register user
// @route POST /api/users/register
// @access Public
exports.register = (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({
    name,
    email,
    password
  });

  if (newUser.password && newUser.password.length < 5) {
    return returnError(
      res,
      null,
      400,
      'Password must be at least 5 characters long'
    );
  }
  bcrypt.hash(newUser.password, 10, (error, hash) => {
    newUser.password = hash;
    newUser
      .save()
      .then(user => res.json({ success: true, data: user }))
      .catch(err => {
        if (err.code === 11000) {
          returnError(
            res,
            err,
            400,
            `The user with the email "${email}" already exists`
          );
        } else {
          returnError(res, err, 500, 'Error creating user');
        }
      });
  });
};

// @desc Login
// @route POST /api/users/login
// @access Public
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return returnError(
      res,
      null,
      404,
      `The user with the email "${email}" was not found`
    );
  }
  bcrypt.compare(password, user.password, (error, equal) => {
    if (!equal) {
      return returnError(res, null, 400, 'Wrong password');
    }
    jwt.sign(
      { user },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '10d' },
      (err, token) => {
        res.json({ success: true, token });
      }
    );
  });
};
