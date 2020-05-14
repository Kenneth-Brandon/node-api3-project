const express = require('express');
const database = require('./postDb');

const router = express.Router();

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

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(request, response, next) {
  let postId = require.body.id;

  if (getById(postId).length !== 0) {
    request.post = postId;
    next();
  } else {
    response.status(400).json({ message: 'Invalid post id.' });
  }
}

module.exports = router;
