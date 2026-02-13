const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const satori = require('satori').default;
const { Resvg } = require('@resvg/resvg-js');
require('dotenv').config();

const app = express();
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());

// Простая функция для генерации картинки (без сложных библиотек)
async function generateImage(title) {
  const svg = await satori(
    {
      type: 'div',
      props: {
        children: title,
        style: {
          display: 'flex',
          fontSize: 60,
          color: 'white',
          background: 'linear-gradient(to right, #6366f1, #a855f7)',
          width: '100%',
          height: '100%',
          padding: '50px',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        },
      },
    },
    {
      width: 1200,
      height: 630,
      // Тут можно добавить шрифты, если нужно
      fonts: [],
    }
  );

  const resvg = new Resvg(svg);
  return resvg.render().asPng();
}

app.get('/api/generate', async (req, res) => {
  const { title = 'Hello World' } = req.query;
  try {
    const png = await generateImage(title);
    res.setHeader('Content-Type', 'image/png');
    res.send(png);
  } catch (e) {
    res.status(500).send('Error generating image');
  }
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

module.exports = app;
