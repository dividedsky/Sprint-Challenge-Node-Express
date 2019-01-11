const express = require('express');
const db = require('../data/helpers/projectModel');
const middleware = require('../common/middleware');

const router = express.Router();
const {ensureValidProject, ensureValidId} = middleware;

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

router.get('/:id', ensureValidId, (req, res) => {
  //const id = req.params.id;
  // id is checked in middleware. if we get here, just send the project
  db.get(req.params.id)
    .then(project => {
      res.status(200).json(project);
    })
    //.catch(err => {
    //res
    //.status(404)
    //.json({errorMessage: `there is no project with that id: ${err}`});
    //});
    .catch(err => {
      res.status(500).json({errorMessage: `idk how we got here: ${err}`});
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

router.delete('/:id', ensureValidId, (req, res) => {
  db.remove(req.params.id)
    .then(count => {
      if (count === 1) {
        res.status(200).send(`${count} project was deleted`);
      } else {
        res
          .status(500)
          .json({errorMessage: 'there was an error deleting the project'});
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({
          errorMessage: `there was an error deleting the project: ${err}`,
        });
    });
});

module.exports = router;
