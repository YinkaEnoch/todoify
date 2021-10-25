const errorHandler = (e, res) => {
  res.status(500).json({ code: 1, error: e });
};

module.exports = errorHandler;
