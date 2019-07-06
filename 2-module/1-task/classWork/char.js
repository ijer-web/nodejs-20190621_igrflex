const fs = require('fs');

const filestream = fs.createReadStream('README.md', {highWaterMark: 9});

const content = '';

// filestream.on('data', (data) =>{
//   console.log(data);
//   content += data;
// });
//
// filestream.on('end', ()=>{
//   console.log(content);
// });

const dataPieces = [];

filestream.on('data', (buffer) =>{
  console.log(buffer);
  dataPieces.push(buffer);
});

filestream.on('end', ()=>{
  const buffer = Buffer.concat(dataPieces);
  console.log(buffer);
  console.log(buffer.toString('utf-8'));
});
