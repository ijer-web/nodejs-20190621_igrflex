const fs = require('fs');

const stream = fs.createReadStream('README.md');
// 1
stream.on('data', (chunk) => {

});

// stream.pipe(streamOut);

// stream.resume();

// stream.on('readable', () => {
//   const chunk = stream.read();
// });

stream.on('error', (err) => {
  console.log('error', err);
});

stream.on('end', () => {
  console.log('end');
});


stream.on('close', ()=>{
  console.log('close');
});

stream.on('open', ()=>{
  stream.destroy(new Error('My errOR'));
});

stream.resume();
