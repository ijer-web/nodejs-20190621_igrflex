const http = require('http');
const fs = require('fs');

const server = new http.Server();

server.on('request', async (req, res) => {
  if (req.url === '/kot') {
    const stream = fs.createReadStream('cat.jpg');

    stream.pipe(res);
    // stream.on('data', (chunk) => {
    //   const needMore = res.write(chunk);
    //   if (needMore === false) {
    //     stream.pause();
    //     res.once('drain', () => {
    //       stream.resume();
    //     });
    //   }
    // });
    stream.on('end', () => {
      console.log(process.memoryUsage().heapUsed);
      res.end();
    });
  } else if (req.url === '/upload') {
    // const stream = fs.createWriteStream('userfie.txt');
    // req.pipe(stream);
    // stream.on('close', () => {
    //   res.end('finished');
    // });

    req.setEncoding('utf-8');
    let body = '';
    for await (const chynk of req) {
      body += chynk;
    }
    console.log(body);
    res.end('uploaded');
  } else {
    res.end('hello');
  }
});

server.listen(3000);
