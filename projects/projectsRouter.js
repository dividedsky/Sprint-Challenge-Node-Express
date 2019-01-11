const express = require('express');
const db = require('../data/helpers/projectModel');
const middleware = require('../common/middleware');

const router = express.Router();
const {ensureValidProject} = middleware;

// get all projects
router.get('/', (req, res) => {
  db.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: `there was an error retrieving the projects: ${err}`,
      });
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res
        .status(404)
        .json({errorMessage: `there is no project with that id: ${err}`});
    });
});

router.post('/', ensureValidProject, (req, res) => {
  db.insert(req.body)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: `there was an error creating the project: ${err}`,
      });
    });
});

module.exports = router;
