const path = require('path');
const fs = require('fs');

const pathToTxt = path.join(__dirname, 'text.txt')

const stream = fs.createReadStream(pathToTxt);
stream.on('data', (chunk) => {
  console.log(chunk.toString())
})
