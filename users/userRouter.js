const express = require('express');
const userDB = require('./userDb');
const postDB = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (request, response) => {
  try {
    const newUser = {
      name: request.body.name,
    };
    userDB.insert(newUser).then((response) => response.send(response));
  } catch {
    response.status(500).json({ error: 'an error has occurred' });
  }
});

router.post('/:id/posts', validateUserId, validatePost, (request, response) => {
  const id = request.params.id;
  try {
    const newPost = {
      text: request.body.text,
      user_id: id,
    };
    postDB.insert(newPost).then((response) => response.send(response));
  } catch {
    response.status(500).json({ error: 'an error has occurred' });
  }
});

router.get('/', (request, response) => {
  try {
    userDB.get().then((response) => response.send(response));
  } catch {
    response.status(500).json({ error: 'an error has occurred' });
  }
});

router.get('/:id', validateUserId, (request, response) => {
  const id = request.params.id;
  try {
    userDB.getById(id).then((response) => response.send(response));
  } catch {
    response.status(500).json({ error: 'an error has occurred' });
  }
});

router.get('/:id/posts', validateUserId, (request, response) => {
  const id = request.params.id;
  try {
    postDB.get().then((response) => {
      const userPosts = response.filter(
        (post) => post.user_id === parseInt(id)
      );
      response.send(userPosts);
    });
  } catch {
    response.status(500).json({ error: 'an error has occurred' });
  }
});

router.delete('/:id', validateUserId, (request, response) => {
  const id = request.params.id;
  try {
    userDB.remove(id).then((response) => response.send({ success: response }));
  } catch {
    response.status(500).json({ error: 'an error has occurred' });
  }
});

router.put('/:id', validateUserId, validateUser, (request, response) => {
  const id = request.params.id;
  try {
    const userUpdate = {
      name: request.body.name,
    };
    userDB
      .update(id, userUpdate)
      .then((response) => response.send({ success: response }));
  } catch {
    response.status(500).json({ error: 'an error has occurred' });
  }
});

//custom middleware

function validateUserId(request, response, next) {
  const id = request.params.id;
  userDB.getById(id).then((response) => {
    if (response) {
      next();
    } else {
      response.status(400).json({ message: 'invalid user id' });
    }
  });
}

function validateUser(request, response, next) {
  if (request.body.name) {
    next();
  } else {
    response.status(400).json({ message: 'missing required name field' });
  }
}

function validatePost(request, response, next) {
  if (request.body.text) {
    next();
  } else {
    response.status(400).json({ message: 'missing required text field' });
  }
}

module.exports = router;
