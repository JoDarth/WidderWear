// server/index.js
const express = require('express');
const cors = require('cors');
const { getInventory } = require('./googleSheetsService');

const app = express();
const port = 5000;

app.use(cors());

app.get('/api/inventory', async (req, res) => {
  try {
    const data = await getInventory();
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
