const express = require('express');
const path = require('path');

const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Serverul rulează pe portul ${PORT}`);
});