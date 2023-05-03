const { createWriteStream} = require("node:fs");
const fs = require("node:fs/promises");
const path = require("path");

const pathToComponents = path.join(__dirname,'components');
const pathToTemplate = path.join(__dirname,'template.html');
const pathToProjectFolder = path.join(__dirname,'project-dist');
const pathToStyles = path.join(__dirname,'styles');
const pathToAssets = path.join(__dirname,'assets');
const pathToCopyAssets = path.join(pathToProjectFolder,'assets');


async function createHtml(){
const templateContent = await fs.readFile(pathToTemplate);
const templateForRead = String(templateContent);
const extractComponent = templateForRead.match(/{{.*}}/g);
await fs.copyFile(pathToTemplate,path.join(pathToProjectFolder,'index.html'))
let indexForRead = templateForRead;
  if(extractComponent){
    for(let item of extractComponent){
      const fileContent = await fs.readFile(path.join(pathToComponents,`${String(item).slice(String(item).indexOf('{')+2,String(item).indexOf('}'))}.html`));
      indexForRead = indexForRead.replace(item,fileContent.toString())
    }
    fs.writeFile(path.join(pathToProjectFolder,'index.html'),indexForRead)
  }
}
async function copyStyles(){
const allFilesOfStyle = await fs.readdir(pathToStyles,{withFileTypes:true});
const cssFile = allFilesOfStyle.filter((item)=>{
  if(path.extname(item.name)==='.css' && !item.isDirectory()){
    return item
  }
})
const writeFile = createWriteStream(path.join(pathToProjectFolder,'style.css'))
cssFile.forEach(async (item) => {
  const fileContent = await fs.readFile(path.join(pathToStyles,item.name));
  writeFile.write(fileContent+'\n')
})
}

async function copyAssets(){
  try{
    await fs.rm(pathToCopyAssets, { recursive: true, force:true });
    await fs.mkdir(pathToCopyAssets);
    const filesForCopy = fs.readdir(pathToAssets,{withFileTypes:true} );
    (await filesForCopy).forEach(async (item) => {
    
      if(item.isDirectory){
        await fs.mkdir(path.join(pathToCopyAssets,item.name))
        const fileForCopy =await fs.readdir(path.join(pathToAssets,item.name))
        fileForCopy.forEach(async (file)=>{
          await fs.copyFile(path.join(pathToAssets,item.name,file),path.join(pathToCopyAssets,item.name,file))
        })
        
      }
});
  } catch(error){
console.log(error.messege)
  }
  
}
async function createProject(){
  await fs.rm(pathToProjectFolder, { recursive: true, force:true });
  await fs.mkdir(pathToProjectFolder);
  const mainIndex = createWriteStream(path.join(pathToProjectFolder,'index.html'))
  createHtml()
  copyStyles()
  copyAssets()
}

createProject()
