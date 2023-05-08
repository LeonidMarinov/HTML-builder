const fsp = require('fs').promises;
const fs = require('fs');
const path = require('path')


const getFiles = async () => {
  const cssFiles = await fsp.readdir(path.join(__dirname, 'styles'), { withFileTypes: true })
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
  const pathOfDistFolder = path.join(__dirname, 'project-dist');
  await fsp.mkdir(pathOfDistFolder, { recursive: true });
  await fsp.writeFile(path.join(__dirname, 'project-dist', 'style.css'), stringData);
}

const copyAssetsDir = async () => {
  const destinationFolderPath = path.join(__dirname, 'project-dist', 'assets');
  await fsp.mkdir(destinationFolderPath, { recursive: true });

  const filesToCopy = await fsp.readdir(path.join(__dirname, 'assets'), { withFileTypes: true });
  for (let i = 0; i < filesToCopy.length; i++) {
    if (filesToCopy[i].isDirectory()) {
      await fsp.mkdir(path.join(__dirname, 'project-dist', 'assets', filesToCopy[i].name), { recursive: true });
    }
  }

  const fontsToCopy = await fsp.readdir(path.join(__dirname, 'assets', 'fonts'), { withFileTypes: true });
  const imgToCopy = await fsp.readdir(path.join(__dirname, 'assets', 'img'), { withFileTypes: true });
  const svgToCopy = await fsp.readdir(path.join(__dirname, 'assets', 'svg'), { withFileTypes: true });

  for (let i = 0; i < fontsToCopy.length; i++) {
    await fsp.copyFile(path.join(__dirname, 'assets', 'fonts', fontsToCopy[i].name),
      path.join(__dirname, 'project-dist', 'assets', 'fonts', fontsToCopy[i].name));
  }

  for (let i = 0; i < imgToCopy.length; i++) {
    await fsp.copyFile(path.join(__dirname, 'assets', 'img', imgToCopy[i].name),
      path.join(__dirname, 'project-dist', 'assets', 'img', imgToCopy[i].name));
  }

  for (let i = 0; i < svgToCopy.length; i++) {
    await fsp.copyFile(path.join(__dirname, 'assets', 'svg', svgToCopy[i].name),
      path.join(__dirname, 'project-dist', 'assets', 'svg', svgToCopy[i].name));
  }
}

const copyHtml = async () => {
  const mainHtml = await fsp.readFile(path.join(__dirname, 'template.html'));
  const stringMainHtml = mainHtml.toString()
  const componentsNames = await fsp.readdir(path.join(__dirname, 'components'));

  let stringbuildHtml = stringMainHtml;

  for (let i = 0; i < componentsNames.length; i++) {
    const searchVal = `{{${componentsNames[i]}`.split('.')[0] + '}}';
    const replaceVal = await fsp.readFile(path.join(__dirname, 'components', componentsNames[i]))
    const stringReplcaeVal = replaceVal.toString();

    stringbuildHtml = stringbuildHtml.replace(searchVal, stringReplcaeVal);
  }

  await fsp.writeFile(path.join(__dirname, 'project-dist', 'index.html'), stringbuildHtml);
}

copyAssetsDir();
writeCssFiles();
copyHtml();