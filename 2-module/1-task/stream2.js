const fs = require('fs');
const os = require('os');
const stream = require('stream');

class SpaceSplitStream extends stream.Transform {
  _transform(chunk, encoding, callback) {
    const str = chunk.toString('utf-8');
    const tokens = str.replace(/ /g, os.EOL);
    for (const token of tokens) {
      this.push(token);
    }
    callback();
  }
}

const split = new SpaceSplitStream();

const input = new stream.PassThrough();

// input.pipe(inc).pipe(process.stdout);
input.pipe(split).pipe(process.stdout);

input.write('one two three');
input.end();
