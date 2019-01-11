const ensureValidProject = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).json({errorMessage: 'the project must contain a name'});
  } else if (req.body.name.length > 128) {
    res.status(400).json({
      errorMessage: 'the project name must be shorter than 128 characters',
    });
  } else if (!req.body.description) {
    res
      .status(400)
      .json({errorMessage: 'the project must contain a description'});
  } else next();
};

module.exports = {ensureValidProject};
