const fs = require("node:fs");
const path = require("path");
const {stdout:output, stdin:input} = process;
const readline = require('node:readline/promises');

const writeText = fs.createWriteStream(path.join(__dirname,'text.txt'));

const readLineInConsole = readline.createInterface({ input, output });
readLineInConsole.write(`Hello, write something in terminal.\n`);

readLineInConsole.on('line',data=>{
  if(data.trim().toLowerCase() === 'exit'){
    readLineInConsole.close();
    output.write('Bye!')
  }else {
    writeText.write(data + '\n');
  }
});

readLineInConsole.on('SIGINT',()=>{
  readLineInConsole.close();
  output.write('Bye!')
});