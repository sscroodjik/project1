const http = require('http');
const fs = require('fs');
const path = require('path');

// Порт сервера
const PORT = 3000;

// Функция для отправки файлов
function sendFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

// Создание сервера
const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    // Отправляем основную страницу
    sendFile(res, path.join(__dirname, 'index.html'), 'text/html');
  } else if (req.url.endsWith('.css')) {
    // Отправляем CSS
    sendFile(res, path.join(__dirname, req.url), 'text/css');
  } else if (req.url.endsWith('.js')) {
    // Отправляем JS-файлы
    sendFile(res, path.join(__dirname, req.url), 'application/javascript');
  } else {
    sendFile(res, path.join(__dirname, '404.html'), 'text/html');
  }
  
});

// Запуск сервера
server.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
