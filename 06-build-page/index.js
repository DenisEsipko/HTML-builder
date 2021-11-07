const fs = require('fs');

const path = require('path');


async function Build() {
  //create index.html

  // создаем папку
  await fs.promises.mkdir(path.resolve(__dirname, 'project-dist'), {'recursive': true});
  //читаем  template.html
  const template = await fs.promises.readFile(path.resolve(__dirname, 'template.html'), 'utf-8');
  // копируем файл template.html в директорию project-dist
  await fs.promises.writeFile((path.resolve(__dirname, 'project-dist', 'index.html')), template);
  // ищем  шаблонные теги  {{header}} {{articles}} {{footer}}
  const templateTags = template.match(/{{[a-z]+}}/g);


  for (const item of templateTags) {
    // вырезаем скобки чтобы узнать имя файла
    const fileName = item.slice(2, -2);
    // читаем файл header, articles, footer
    const fileContent = await fs.promises.readFile(path.resolve(__dirname, 'components', `${fileName}.html`), 'utf-8');
    // создаем временный   файл index.html
    const tempFile = await fs.promises.readFile(path.resolve(__dirname, 'project-dist', 'index.html'), 'utf-8');
    // заменяем содержимое
    const newFile = tempFile.replace(item, fileContent);
    //записываем
    await fs.promises.writeFile(path.resolve(__dirname, 'project-dist', 'index.html'), newFile);
  }


  //собираем стили
  const bundle = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'style.css'));
  fs.readdir(path.resolve(__dirname, 'styles'), (err, files) => {
    if (err) {
      console.log('ERORE!!! ' + err.name);
      return;
    }
    files.forEach(file => {
      if (path.extname(file) === '.css') {
        const stream = fs.createReadStream(
          path.resolve(__dirname, 'styles', file));
        let data = '';
        stream.on('data', partData => bundle.write(data += partData));
      }
    });

  });

  // собираем копируем из папки assets
  try {
    const pathToFiles = path.join(__dirname, 'assets\\');
    const pathToFilesCopy = path.join(__dirname, 'project-dist\\assets\\');

    const folders = await fs.promises.readdir(pathToFiles);
    for (const folder of folders) {
      const pathFolder = pathToFiles + folder + '\\';
      const pathFolderCopy = pathToFilesCopy + folder + '\\';
      await fs.promises.mkdir(pathFolderCopy, {recursive: true});
      const files = await fs.promises.readdir(pathFolder);
      for (const file of files) {
        const pathToFile = pathFolder + file;
        const pathToFileCopy = pathFolderCopy + file;
        await fs.promises.copyFile(pathToFile, pathToFileCopy);
      }
    }
  }
  catch (err) {
    console.log('ошибка копирования '+err);
  }
}

Build();
/*


Описание хода проверки задания 06-build-page:

    Откройте файл index.js находящийся в папке 06-build-page и проверьте его на наличие синхронных методов модуля fs(можно воспользоваться сочетанием клавиш ctrl + f и ввести в появившемся поле поиска Sync). В случае использования синхронных методов задание считается невыполненным - 0 баллов.

    Проверьте файл index.js на наличие экспериментальной функции fsPromises.cp(). В случае её использования задание считается невыполненным - 0 баллов.

    Запустите скрипт командой node 06-build-page находясь в корневом каталоге репозитория.

    После завершения работы скрипта в директории 06-build-page должна быть создана папка project-dist содержащая в себе файлы index.html и style.css, а так же папку assets. Если этого не произошло, то задание считается невыполненным - 0 баллов.

    Убедитесь, что файл index.html содержит разметку из файла template.html с заменой шаблонных тегов разметкой одноимённых файлов-компонентов из папки components. Разметка файлов-компонентов должна находиться строго на местах соответствующих шаблонных тегов. Самих тегов в файле index.html быть не должно. В случае если это не так задание считается невыполненным - 0 баллов.

    Проверьте файл style.css на наличие правильной сборки стилей из папки styles. По аналогии с заданием 05-merge-styles стили должны сохранять форматирование и не вклиниваться друг в друга. В случае если стили собраны некорректно задание считается невыполненным - 0 баллов.

    Откройте папку assets. Убедитесь, что её содержимое и содержимое подпапок находящихся внутри точно соответствует содержимому папки assets находящейся в 06-build-page/assets. В случае если это не так задание считается невыполненным - 0 баллов.

    Добавьте в проект тестовые файлы из папки test-files:

    06-build-page/test-files/components/about.html -> 06-build-page/components/about.html

    06-build-page/test-files/images/squirrel-2.jpg -> 06-build-page/assets/img/squirrel-2.jpg

    06-build-page/test-files/styles/about.css -> 06-build-page/styles/about.css

    Не забудьте указать новый шаблонный тег в файле template.html. Затем выполните ещё раз пункты 3-7.

В случае успешной проверки всех пунктов за задание начисляется 50 баллов
 */