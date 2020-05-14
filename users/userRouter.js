const express = require('express');
const database = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.get('/', (request, response) => {
  database
    .get()
    .then((response) => {
      response.status(200).json(response);
    })
    .catch((error) => {
      response.status(500).json({ message: 'database error: GET /' });
    });
});

router.get('/:id', validateUserId, (request, response) => {
  response.status(200).json(request.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(request, response, next) {
  let id = request.params.id;

  database
    .getById(id)
    .then((response) => {
      if (!response) {
        response.status(400).json({
          message: 'Invalid user id.',
        });
      } else {
        request.user = response;
        next();
      }
    })
    .catch((error) => {
      response.status(500).json({
        message: 'Database error: GET /:id.',
      });
    });
}

function validateUser(request, response, next) {
  if (!request.body) {
    response.status(400).json({
      message: 'Missing user data.',
    });
  } else if (!request.body.name) {
    response.status(400).json({
      message: 'Missing required name field.',
    });
    next();
  }
}

function validatePost(request, response, next) {
  if (!request.body) {
    response.status(400).json({
      message: 'Missing post data.',
    });
  } else if (!request.body.text) {
    response.status(400).json({
      message: 'Missing required text field.',
    });
  }
  next();
}

module.exports = router;
