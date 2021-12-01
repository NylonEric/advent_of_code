const fs = require('fs');
const readline = require('readline');
const path = require('path');

const countIncreases = (fileName) => {
  let count = 0;
  const filePath = path.resolve(__dirname, `./${fileName}`);
  let stream = fs.createReadStream(filePath);

  let readlineSettings = {
    input: stream,
    output: process.stdout,
    console: false
  }

  const readInterface = readline.createInterface(readlineSettings);

  let previousLine = null;
  readInterface.on('line', function(line) {
    if (!previousLine) {
      previousLine = line
    } else {
      if (Number(previousLine) < Number(line)) {
        count++;
        previousLine = line;
        console.log('here is previous, current and count: ', previousLine, line, count);
      }
    }
  })
  .on('close', function() {
    console.log('here is the count of increases:', count);
    return count;
    process.exit(0);

  });
};

countIncreases('aoc_1.txt');