const express = require('express');
const db = require('../data/helpers/actionModel');
const middleware = require('../common/middleware');

const router = express.Router();
const {ensureValidAction, ensureValidActionId} = middleware;

router.get('/', (req, res) => {
  db.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: `there was an error retrieving the actions: ${err}`,
      });
    });
});

router.get('/:id', ensureValidActionId, (req, res) => {
  // id will be checked in middleware. if we get here, send the project
  db.get(req.params.id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res
        .status(500)
        .json({errorMessage: `i'm amazed that you made it here! ${err}`});
    });
});

router.post('/', ensureValidAction, (req, res) => {
  // action has already been validated in middleware
  db.insert(req.body)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: `there was an error creating the action: ${err}`,
      });
    });
});

module.exports = router;
