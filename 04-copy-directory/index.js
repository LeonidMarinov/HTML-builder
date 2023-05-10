
const fs = require('fs').promises;
const path = require('path')

const copyDir = async () => {

  await fs.rm(path.join(__dirname, 'files-copy'), {recursive: true, force: true})

  const destinationFolderPath = path.join(__dirname, 'files-copy')
  fs.mkdir(destinationFolderPath, {recursive: true});
  const filesToCopy = await fs.readdir(path.join(__dirname, 'files'))
  let copiedFiles = ''

  for (let i = 0; i < filesToCopy.length; i++) {
    fs.copyFile(path.join(__dirname, 'files', filesToCopy[i]), path.join(__dirname, 'files-copy', filesToCopy[i]));
  }

  copiedFiles = await fs.readdir(path.join(__dirname, 'files-copy'))

  console.log('initial', filesToCopy.length)
  console.log('copied', copiedFiles.length)

  // for (let i = 0; i < copiedFiles.length; i++) {
  //   if (copiedFiles.length !== filesToCopy.length && typeof copiedFiles !== 'string') {
  //     await fs.unlink(path.join(__dirname, 'files-copy', copiedFiles[i]))
  //   }
  //   fs.copyFile(path.join(__dirname, 'files', filesToCopy[i]), path.join(__dirname, 'files-copy', filesToCopy[i]));
  // }

}

copyDir();