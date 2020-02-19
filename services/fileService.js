const fs = require("../utils/fs");
const db = require("../db/files");
const configFiles = require("../config/constants");

const ignoredFiles = configFiles.ignoredFiles;

/**
 * Удаляет лишние файлы из папки
 */
const deleteRedundantFiles = () => {
  db.getAllFileNames().then(filesFrommDb => {
    fs.readdir(configFiles.uploadsFolder)
      .then(filesFrommFS => {
        let filesForDeletion = compareFileNames(filesFrommDb, filesFrommFS);
        filesForDeletion.forEach(file => {
          fs.unlink(configFiles.uploadsFolder + file, err => {
            if (err) throw err;
            console.log(`Удален файл: ${file}`);
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  });
};

/**
 * Проверяет наличие названий файлов в таблице бд
 * @param {*} filesFrommDb - Список имен файлов из бд
 * @param {*} filesFrommFS - Список имен файлов в папке
 */
const compareFileNames = (filesFrommDb, filesFrommFS) => {
  let filesToDelete = filesFrommFS.filter(item => {
    if (!filesFrommDb.includes(item) && !ignoredFiles.includes(item)) {
      return item;
    }
  });
  return filesToDelete;
};

module.exports = { deleteRedundantFiles };
