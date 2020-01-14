exports.returnError = (res, error, statusCode, message) => {
  // eslint-disable-next-line no-console
  console.error(error);
  return res.status(statusCode).json({ error: message });
};

exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;

    next();
  } else {
    return res.sendStatus(403);
  }
};
