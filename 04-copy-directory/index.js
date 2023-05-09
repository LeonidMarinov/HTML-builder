
const fs = require('fs').promises;
const path = require('path')

const copyDir = async () => {
  const destinationFolderPath = path.join(__dirname, 'files-copy')
  fs.mkdir(destinationFolderPath, {recursive: true});
  const filesToCopy = await fs.readdir(path.join(__dirname, 'files'))

  for (let i = 0; i < filesToCopy.length; i++) {
    fs.copyFile(path.join(__dirname, 'files', filesToCopy[i]), path.join(__dirname, 'files-copy', filesToCopy[i]));
  }

  const copiedFiles = await fs.readdir(path.join(__dirname, 'files-copy'))

  for (let i = 0; i < copiedFiles.length; i++) {
    if (!copiedFiles.includes(filesToCopy[i])) {
      fs.unlink(path.join(__dirname, 'files-copy', copiedFiles[i]))
    }
  }

}

copyDir();