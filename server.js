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
server.use(logger);

server.use('/api/posts', logger, postRouter);
server.use('/api/users', logger, userRouter);

server.get('/', (request, response) => {
  response.send('<h1>User and Post API</h1>');
});

//custom middleware
function logger(request, response, next) {
  console.log(`
  {
      method: ${request.method},
      url: ${request.url},
      timestamp: ${new Date().toLocaleString()}
  }
  `);
  next();
}

module.exports = server;
