const fs = require('fs').promises;
const path = require('path')

const getData = async () => {
  const files = await fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}) 
  const outputFiles = files.filter((el) => !el.isDirectory());
  const stats = [];

  for (let i = 0; i < outputFiles.length; i++) {
    let stat = await fs.stat(path.join(__dirname, 'secret-folder', outputFiles[i].name))
    stats.push(stat.size)
  }
  
  let resultArr = outputFiles.map((el, i) => {
    let name = el.name.split('.').join(' - ');
    return name + ' - ' + stats[i] + 'b';
  })

  console.log(resultArr)
}

getData();
