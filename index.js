// code away!
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

server.use('/api/posts', logger, postRouter);
server.use('/api/users', logger, userRouter);

server.get('/', logger, (request, response) => {
  response.send('<h1>User and Post API</h1>');
});

function logger(request, response, next) {
  let currentTime = new Date();
  console.log(
    request.method,
    request.url,
    'at',
    currentTime.toLocaleTimeString()
  );
  next();
}

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`\r\n Server running on http://localhost:${PORT}\r\n`);
});
