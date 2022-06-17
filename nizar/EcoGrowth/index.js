const express = require('express')
const app = express()
const port = 8080
const path = require('path');


app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'login/login.html'));
})
app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
  })

app.use(express.static("."));


app.listen(port, () => {
  console.log(`Vai a vedere il mio sito! - ` + 'porta numero ' + port)
})



