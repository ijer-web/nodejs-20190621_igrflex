const fs = require('fs');
const stream = require('stream');

const s = fs.createReadStream(__filename);

class IncrementStream extends stream.Transform {
  _transform(chunk, encoding, callback) {
    const num = ++chunk;
    callback(null, num.toString());
  }
}

const inc = new IncrementStream();

const input = new stream.PassThrough();

// input.pipe(inc).pipe(process.stdout);
input.pipe(inc).pipe(process.stdout);

input.write('1');
input.write('2');
input.write('3');
input.write('4');
input.end();
