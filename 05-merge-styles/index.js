const { createWriteStream, createReadStream, read } = require("node:fs");
const fs = require("node:fs/promises");
const { extname } = require("node:path");
const path = require("path");

const pathToStyles = path.join(__dirname,'styles')
const pathToProject = path.join(__dirname,'project-dist')

async function createCommonStyle(){
  const allFilesOfStyle = await fs.readdir(pathToStyles,{withFileTypes:true});
  const cssFile = allFilesOfStyle.filter((item)=>{
    if(path.extname(item.name)==='.css' && !item.isDirectory()){
      return item
    }
  })
  const writeFile = createWriteStream(path.join(pathToProject,'bundle.css'))
  cssFile.forEach(async (item) => {
    const fileContent = await fs.readFile(path.join(pathToStyles,item.name));
    writeFile.write(fileContent+'\n')
  })
}
createCommonStyle()