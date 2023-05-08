const fsp = require('fs').promises;
const fs = require('fs');
const path = require('path')


const getFiles = async () => {
  const cssFiles = await fsp.readdir(path.join(__dirname, 'styles'), {withFileTypes: true})
  const trueCssFiles = cssFiles.filter((el) => {
    const helperArr = el.name.split('.')
    const ext = helperArr[helperArr.length - 1];
    return !el.isDirectory() && ext === 'css';
  })

  return trueCssFiles;
}

const readCssFiles = async () => {
  const cssFiles = await getFiles();
  const data = []
  
  for (let i = 0; i < cssFiles.length; i++) {
    const cssFileData = await fsp.readFile(path.join(__dirname, 'styles', cssFiles[i].name));
    data.push(cssFileData.toString());
  }

  return data;
}

const writeCssFiles = async () => {
  const data = await readCssFiles();
  const stringData = data.join('\n\n');

  await fsp.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), stringData);
}


writeCssFiles();