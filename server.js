const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = express();

app.get('/', (req, res) => {
  res.send('Api is working');
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(`${__dirname}/public/`));
  app.get(/.*/, (req, res) => res.sendFile(`${__dirname}/public/index.html`));
}

const port = process.env.PORT || 8000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
