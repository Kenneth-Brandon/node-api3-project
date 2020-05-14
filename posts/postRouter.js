const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
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
