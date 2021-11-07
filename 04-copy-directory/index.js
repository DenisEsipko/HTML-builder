/*
 1) после завершения работы функции создаётся папка files-copy содержимое которой является точной копией
    исходной папки files.
 2) При добавлении/удалении/изменении файлов в папке files и повторном запуске node 04-copy-directory
    содержимое папки files-copy актуализируется.
Запрещается использование fsPromises.cp()
 */

const {promises: fs} = require('fs');
const path = require('path');

const {mkdir } = require('fs/promises');

// nameFolderClear - название папки с которым мы работаем
const clearFolder = async (nameDirClear) => {
  //удаляем
  await fs.rm(nameDirClear, { recursive: true });
  //создаем
  await mkdir(nameDirClear, { recursive: true });
};

async function copyDir(src, dest) {
  //читаем директорию
  let entries = await fs.readdir(src, {withFileTypes: true});
  // очищаем  создаем  старую папку
  await clearFolder(dest);


  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    entry.isDirectory() ? await copyDir(srcPath, destPath) : await fs.copyFile(srcPath, destPath);
  }
}

copyDir(path.join(__dirname, '/files'), path.join(__dirname, '/files-copy'));



/*
Описание хода проверки задания 04-copy-directory:

    1) Откройте файл index.js находящийся в папке 04-copy-directory и проверьте его на наличие
       синхронных методов модуля fs(можно воспользоваться сочетанием клавиш ctrl + f и ввести в
       появившемся поле поиска Sync). В случае использования синхронных методов задание
       считается невыполненным - 0 баллов.
    2) Проверьте файл index.js на наличие экспериментальной функции fsPromises.cp().
       В случае её использования задание считается невыполненным - 0 баллов.
    3) Откройте папку files и убедитесь, что она не пуста. В противном случае создайте несколько
       файлов на ваше усмотрение.
    4) Запустите скрипт командой node 04-copy-directory находясь в корневом каталоге репозитория.
    5) После завершения выполнения скрипта проверьте папку 04-copy-directory на наличие созданной
       папки files-copy с точной копией содержимого исходной папки files. Если данная папка отсутствует
        или же содержимое не совпадает с содержимым папки files задание считается невыполненным - 0 баллов.
    6) Добавьте ещё несколько новых файлов в папку files и удалите один из ранее существовавших.
       Запустите команду node 04-copy-directory.
    7) Убедитесь, что содержимое папки files-copy обновлено и соответствует содержимому папки files.
       Если в процессе выполнения произошла ошибка или состояние папки files-copy не было актуализировано
       задание считается невыполненным - 0 балло
 */
