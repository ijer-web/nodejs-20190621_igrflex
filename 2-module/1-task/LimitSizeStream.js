const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    const limit = 0;
    const counter = 0;

    this.setLimit(options.limit);
    this.resetCounter();
  }

  _transform(chunk, encoding, callback) {
    const str = chunk.toString('utf-8');
    this.incCounter(str.length);
    if (this.checkCounterAndLimit()) {
      callback(null, str);
    } else callback(new LimitExceededError());
  }

  setLimit(limit) {
    this.limit = limit;
  }

  resetCounter() {
    this.counter = 0;
  }

  incCounter(plus) {
    this.counter+=plus;
  }

  checkCounterAndLimit() {
    return this.counter <= this.limit;
  }
}

module.exports = LimitSizeStream;
