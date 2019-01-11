const pDb = require('../data/helpers/projectModel');
const aDb = require('../data/helpers/actionModel');

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

const ensureValidProjectId = (req, res, next) => {
  const id = req.params.id;
  pDb
    .get(id)
    .then(project => {
      next();
    })
    .catch(err => {
      res
        .status(404)
        .json({errorMessage: `there is no project with that id: ${err}`});
    });
};

const ensureValidActionId = (req, res, next) => {
  const id = req.params.id;
  aDb
    .get(id)
    .then(action => {
      next();
    })
    .catch(err => {
      res
        .status(404)
        .json({errorMessage: `there is no action with that id: ${err}`});
    });
};

module.exports = {
  ensureValidProject,
  ensureValidProjectId,
  ensureValidActionId,
};
