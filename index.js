// code away!
const express = require('express');

const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

const server = express();

server.use(express.json());

server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

server.get('/', (request, response) => {
  response.send('<h1>User and Post API</h1>');
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`\r\n Server running on http://localhost:${PORT}\r\n`);
});
