const url = require('url');
const http = require('http');
const path = require('path');
const server = new http.Server();
const fs = require('fs');

const LimitSizeStream = require('./LimitSizeStream');

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);
  const urlLength = pathname.split('/').length;
  if (urlLength > 1) {
    res.statusCode = 400;
    res.end('Subfolders are not supported.');
    return;
  }

  const limitedStream = new LimitSizeStream({limit: 1000000});
  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'POST':
      const stream = fs.createWriteStream(filepath, {flags: 'wx'});
      req.pipe(limitedStream).pipe(stream);
      stream.on('error', (err) => {
        console.log(' stream err.code', err.code);
        if (err.code === 'EEXIST') {
          res.statusCode = 409;
          res.end('file already exists');
        } else {
          res.statusCode = 500;
          res.end('error');
        }
      });

      limitedStream.on('error', (err) => {
        console.log('catched size error');
        res.statusCode = 413;
        res.end('too big');
        fs.unlink(filepath, () => {
        });
      });

      stream.on('close', () => {
        res.statusCode = 201;
        res.end('ok');
      });

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

server.on('clientError', (err, socket) => {
  fs.unlink(filePath, () => {

  });
});

module.exports = server;
