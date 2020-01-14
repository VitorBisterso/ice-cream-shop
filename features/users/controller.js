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
    const errorMessage = 'Password must be at least 5 characters long';
    return returnError(res, errorMessage, 400, errorMessage);
  }
  bcrypt.hash(newUser.password, 10, (error, hash) => {
    newUser.password = hash;
    newUser
      .save()
      .then(user => res.json({ success: true, data: user }))
      .catch(err => {
        if (err.code === 11000) {
          return returnError(
            res,
            err,
            400,
            `The user with the email "${email}" already exists`
          );
        }
        return returnError(res, err, 500, 'Error creating user');
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
    const errorMessage = `The user with the email "${email}" was not found`;
    return returnError(res, errorMessage, 404, errorMessage);
  }
  bcrypt.compare(password, user.password, (error, equal) => {
    if (!equal) {
      const errorMessage = 'Wrong password';
      return returnError(res, errorMessage, 400, errorMessage);
    }
    jwt.sign(
      { user },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '10d' },
      (err, token) => res.json({ success: true, token })
    );
  });
};
