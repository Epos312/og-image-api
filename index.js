const express = require('express');
const cors = require('cors');
const satori = require('satori').default;
const { Resvg } = require('@resvg/resvg-js');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/generate', async (req, res) => {
  const { title = 'My Startup' } = req.query;
  try {
    const svg = await satori(
      {
        type: 'div',
        props: {
          children: title,
          style: {
            display: 'flex', fontSize: 60, color: 'white',
            background: 'linear-gradient(to right, #6366f1, #a855f7)',
            width: '100%', height: '100%', padding: '50px',
            justifyContent: 'center', alignItems: 'center', textAlign: 'center',
          },
        },
      },
      { width: 1200, height: 630, fonts: [] }
    );
    const resvg = new Resvg(svg);
    const pngBuffer = resvg.render().asPng();

    res.setHeader('Content-Type', 'image/png');
    res.send(pngBuffer);
  } catch (e) {
    res.status(500).send('Error generating image');
  }
});

app.get('/api/health', (req, res) => res.json({ status: 'active' }));

module.exports = app;
