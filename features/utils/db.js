exports.returnError = (error, message, res) => {
  // eslint-disable-next-line no-console
  console.error(error);
  return res.status(500).json({ error: message });
};
