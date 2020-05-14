const express = require('express');
const database = require('./postDb');

const router = express.Router();

router.post('/', validatePost, (request, response) => {
  database
    .insert(request.body)
    .then((response) => {
      response.status(201).json(response);
    })
    .catch((error) => {
      response.status(500).json({
        message: 'Database error: POST /',
      });
    });
});

router.get('/', (request, response) => {
  database
    .get()
    .then((response) => {
      response.status(200).json(response);
    })
    .catch((error) => {
      response.status(500).json({
        message: 'Database error: GET /',
      });
    });
});

router.get('/:id', validatePostId, (request, response) => {
  response.status(200).json(request.response);
});

router.delete('/:id', validatePostId, (request, response) => {
  database
    .remove(request.response.id)
    .then((response) => {
      request.status(200).json(response);
    })
    .catch((error) => {
      response.status(404).json({
        message: 'Unable to delete post.',
      });
    });
});

router.put('/:id', validatePostId, (request, response) => {
  database
    .update(request.response.id, request.body)
    .then((response) => {
      response.status(200).json(response);
    })
    .catch((error) => {
      response.status(404).json({
        message: 'Unable to edit post.',
      });
    });
});

// custom middleware

function validatePostId(request, response, next) {
  let id = request.params.id;

  database
    .getById(id)
    .then((response) => {
      if (!response) {
        response.status(400).json({
          message: 'Invalid post id.',
        });
      } else {
        request.response = response;
        next();
      }
    })
    .catch((error) => {
      response.status(500).json({
        message: 'Database error: GET /:id',
      });
    });
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
