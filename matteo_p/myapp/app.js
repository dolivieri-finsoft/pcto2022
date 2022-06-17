const express = require('express')
const app = express()
const port = 3000

app.use(express.static('./'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/app.html");
})

app.post('/*', (req, res) => {
  console.log("logged");
  //res.redirect('/');
})

app.listen(port, () => {
  console.log("Example app listening on port "+ port)
})

