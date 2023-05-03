const path = require("path");
const fs = require('node:fs/promises');
const { readdir, stat } = require("fs");

const pathToFiles = path.join(__dirname,'secret-folder');
const option = {withFileTypes:true}
async function getFileFromFolder(pathToFiles,option){
  try{
    const files = await fs.readdir(pathToFiles, option)
    const allFiles = files.filter((item) =>{
      if(!item.isDirectory()){
        return item
      }
    })
    allFiles.forEach((item)=>{
      showInfoAboutFile(item)
    })
  } catch(error){
    console.log(error.message)
  }
  
}
async function showInfoAboutFile(file){
  const fileStats = await fs.stat(path.join(pathToFiles,file.name));
  let nameOfFiles = String((file.name).split('.'))
  let nameOfFile = nameOfFiles.slice(0,nameOfFiles.indexOf(','))
  let fileExtends = nameOfFiles.slice(nameOfFiles.indexOf(',')+1)
  let fileSize = (fileStats.size / 1024).toFixed(3)
  console.log(`${nameOfFile}-${fileExtends}-${fileSize}kb`)
}
getFileFromFolder(pathToFiles,option)