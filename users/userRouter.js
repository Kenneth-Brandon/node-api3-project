const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(request, response, next) {
  let userId = request.body.id;

  if (getById(userId).length !== 0) {
    request.user = userId;
    next();
  } else {
    response.status(400).json({
      message: 'Invalid user id.',
    });
  }
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
