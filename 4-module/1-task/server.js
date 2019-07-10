const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  try {
    const pathname = url.parse(req.url).pathname.slice(1);
    const urlLength = pathname.split('/').length;

    if (urlLength > 1) {
      res.statusCode = 400;
      res.end('Subfolders are not supported.');
      return;
    }

    const filepath = path.join(__dirname, 'files', pathname);

    switch (req.method) {
      case 'GET':

        fs.stat(filepath, function(err) {
          if (err) {
            res.statusCode = 404;
            res.end('File does not exist');
          } else {
            const stream = fs.createReadStream(filepath);
            stream.pipe(res);
            stream.on('end', () => {
              res.statusCode = 200;
              res.end();
            });
          }
        });

        break;

      default:
        res.statusCode = 501;
        res.end('Not implemented');
    }
  } catch (e) {
    res.statusCode = 500;
    res.end('Something went wrong');
  }
});

module.exports = server;
