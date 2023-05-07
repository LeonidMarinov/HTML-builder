const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

stdout.write('hello reviewer 1, pls enter text\n');
stdin.on('data', (data) => {
  const stringData = data.toString().trim();
  if (stringData === 'exit' || stringData === 'exit' || stringData === 'exit') {
    process.exit(0)
  };

  fs.appendFile(path.join(__dirname, 'text.txt'), data, (err) => {
    if (err) throw err;
  })
})

process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', () => console.log('Bye!'));

