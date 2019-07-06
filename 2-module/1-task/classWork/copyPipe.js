const fs = require('fs');
const zlib = require('zlib');
const stream = require('stream');
const promisify = require('util').promisify;

const fileIn = fs.createReadStream('README.md', {highWaterMark: 100});
const gzip = zlib.createGzip();
const fileOut = fs.createWriteStream('README.md'+'.out', {highWaterMark: 100});

fileIn
    .on('error', cleanup)
    .pipe(gzip)
    .on('error', cleanup)
    .pipe(fileOut)
    .on('error', cleanup);


stream.pipeline(
    fileIn, gzip, fileOut, (err) => {
      if (err) cleanup();
      else console.log('done');
    }
);


fileIn.on('end', ()=>{
  fileOut.end();
});

function cleanup() {
  fs.unlink(fileOut.path, (err) => {
    if (err && err.code == 'ENQENT') {

    } else if (err) {
      throw err;
    }
  });

  fileIn.destroy();
  fileOut.destroy();
}
