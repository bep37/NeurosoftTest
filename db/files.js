const db = require("./dbQuery");

const getAllFilesQuery = "SELECT ecg_record FROM schema.training";

/**
 * Получение всех имен файлов
 */
const getAllFileNames = () => {
  let result;
  return db
    .executeTheQuery(getAllFilesQuery)
    .then(rows => {
      result = rows
        .map(item => item.ecg_record)
        .filter(item => item != null);
      db.closeConnection();
    })
    .then(() => {
      return result;
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  getAllFileNames
};
