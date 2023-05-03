const fs = require("node:fs/promises");
const path = require("path");
const { copyFile } = require("node:fs/promises");

const pathToFiles = path.join(__dirname, "files");
const pathToCopyFiles = path.join(__dirname, "files-copy");
const option = { withFileTypes: true };

async function getFileFromFolder(pathToFiles, option) {
  try {
        await fs.rm(pathToCopyFiles, { recursive: true, force:true });
        await fs.mkdir(pathToCopyFiles);
        const filesForCopy = fs.readdir(pathToFiles, option);
        (await filesForCopy).forEach((item) => {
          copyFile(
            path.join(pathToFiles, item.name),
            path.join(pathToCopyFiles, item.name)
          );
        });
      
  }catch (error) {
    console.log(error.message);
  }
}
getFileFromFolder(pathToFiles, option);
