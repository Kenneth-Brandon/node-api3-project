// code away!
const server = require('./server');
const PORT = 5000;

server.listen(PORT, () => {
  console.log(`\r\n*** Server running on http://localhost:${PORT}***\r\n`);
});
