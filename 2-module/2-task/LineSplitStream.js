const stream = require('stream');
const os = require('os');
let results = '';

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    results = '';
  }

  _transform(chunk, encoding, callback) {
    results+=chunk.toString('utf-8');
    callback();
  }


  _flush(callback) {
    const tokens = results.split(os.EOL);
    for (const token of tokens) {
      this.push(token);
    }
    callback();
  }
}

module.exports = LineSplitStream;
