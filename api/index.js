const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Тестовая страница, чтобы проверить, что сайт ВООБЩЕ работает
app.get('/', (req, res) => {
  res.send('<h1>Сервер запущен!</h1><p>Используйте /api/health для проверки.</p>');
});

// Проверка пульса
app.get('/api/health', (req, res) => {
  res.json({ status: 'active', message: 'Bishkek connection ok' });
});

// Упрощенная генерация (пока без сложной графики, чтобы ушла ошибка 500)
app.get('/api/generate', (req, res) => {
  const title = req.query.title || 'No title';
  res.setHeader('Content-Type', 'text/html');
  res.send(`<div style="background:linear-gradient(to right, #6366f1, #a855f7); color:white; padding:50px; font-size:40px; font-family:sans-serif;">${title}</div>`);
});

module.exports = app;
