const url = require('url');
const http = require('http');
const path = require('path');

const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'DELETE':

      if (pathname.includes('/')) {
        res.statusCode = 400;
        res.end('Bad request');
      };

      fs.unlink(filepath, function(err) {
        if (err) {
          res.statusCode = 404;
          res.end('No file such path');
        }
        res.statusCode = 200;
        res.end('ok');
      });

      req.on('error', function(err) {
        if (err) {
          res.statusCode = 500;
          res.end('*** internal error ***');
        };
      });

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
