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

const ensureValidAction = (req, res, next) => {
  if (!req.body.project_id) {
    res
      .status(400)
      .json({errorMessage: 'the action must contain a project id'});
  } else if (!req.body.description) {
    res
      .status(400)
      .json({errorMessage: 'the action must contain a description'});
  } else if (!req.body.notes) {
    res.status(400).json({errorMessage: 'the action must contain notes'});
  }
  // ensure valid project id
  else {
    pDb
      .get(req.body.project_id)
      .then(project => {
        //the project id is valid. carry on
        next();
      })
      .catch(err => {
        // project id is invalid!
        res.status(400).json({
          errorMessage: `project_id is invalid! must be an existing project: ${err}`,
        });
      });
  }
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
  ensureValidAction,
};
