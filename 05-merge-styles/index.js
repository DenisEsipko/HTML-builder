/*
Требования
После завершения работы скрипта в папке project-dist должен находиться файл bundle.css
содержащий стили из всех файлов папки styles.

При добавлении/удалении/изменении файлов стилей в папке styles и повторном запуске скрипта
 файл bundle.css перезаписывается и содержит актуальные стили.

Любые файлы имеющие расширение отличное от css или директории игнорируются.
Стили находящиеся в файле bundle.css созданном в процессе сборки не должны быть повреждены.
 */

const fs = require('fs');
const path = require('path');

const bundle = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(path.resolve(__dirname, 'styles'), (err, files) => {
  if (err) {
    console.log('ERORE!!! ' + err.name);
    return;
  }
  files.forEach(file => {
    if (path.extname(file) === '.css') {
      const stream = fs.createReadStream(
        path.resolve(__dirname, 'styles', file));
      let string_data = '';
      stream.on('data', partData => bundle.write(string_data += partData));
    }
  });

});

/*

    1) Откройте файл index.js находящийся в папке 05-merge-styles и проверьте его на наличие синхронных
       методов модуля fs(можно воспользоваться сочетанием клавиш ctrl + f и ввести в
       появившемся поле поиска Sync). В случае использования синхронных методов задание
       считается невыполненным - 0 баллов.
    2) Убедитесь, что в папке project-dist находится только файл index.html.
       При наличии посторонних файлов удалите их.
    3) Запустите скрипт командой node 05-merge-styles находясь в корневом каталоге репозитория.
       Для наглядности работы скрипта вы можете открыть файл index.html с помощью расширения Live Server.
       При наличии ошибок во время работы скрипта задание считается невыполненным - 0 баллов.
    4) Проверьте содержимое файла bundle.css. Cодержимое файла и форматирование стилей в нем должно
       соответствовать файлам-исходникам, стили не должны сливаться. Последовательность стилей не проверяется!
       Если bundle.css содержит некорректные стили задание считается невыполненным - 0 баллов.
    5) Измените содержимое папки styles удалив один или несколько файлов стилей, или же замените папку styles
       и project-dist/index.html на содержимое папки test-files(сгенерированный ранее файл bundle.css должен остаться в project-dist).
    6) В папку styles добавьте файл с расширением отличным от css и содержимым
       вида ext-test-string(или любой другой строкой по вашему выбору).
    7) Запустите скрипт и убедитесь, что файл bundle.css перезаписан и содержит актуальные и
       корректные стили. Если этого не произошло задание считается невыполненным - 0 баллов.
    8) Выполните поиск строки ext-test-string(или строки записанной в файл с расширением отличным от css)
       по файлу bundle.css с помощью комбинации клавиш ctrl + f. При наличии строки в файле задание считается невыполненным - 0 баллов.

В случае успешной проверки всех пунктов за задание начисляется 20 баллов
 */