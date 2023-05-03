const fs = require("node:fs");
const path = require("path");
const {stdout} = process;
const readFile = fs.createReadStream(path.join(__dirname,'text.txt'),'utf-8')
readFile.on('data', (chunk)=>{
  console.log(chunk)
})