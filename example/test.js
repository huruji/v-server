const fs = require('fs');
const { join } = require('path')

async function print(path) {
  const files = await fs.promises.readdir(path);
  for (const file of files) {
    console.log(file);
  }
}

function flatMap(array){
  const buffer = []
  array.forEach(element => buffer.push(...element))
  return buffer
}

function findDirectories(directoryPath) {
  try {
    return [directoryPath, ...flatMap(fs.readdirSync(directoryPath)
      .map     (path  => join(directoryPath, path))
      .filter  (entry => fs.existsSync(entry))
      .filter  (entry => fs.statSync(entry).isDirectory())
      .map     (entry => findDirectories(entry)))]
  } catch {
    return [directoryPath]
  }
}

console.log(findDirectories('./'))
// print('./').catch(console.error);
