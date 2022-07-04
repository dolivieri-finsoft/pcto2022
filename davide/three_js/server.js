import express from 'express';

const app = express();
const port = 3445;

app.get('/', (req, res) => {
  res.send('git!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
