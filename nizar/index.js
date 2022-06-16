const express = require('express')
const app = express()
const port = 8080
const path = require('path');


app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'EcoGrowth/login/login.html'));
})
app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'EcoGrowth/index.html'));
  })

app.use(express.static("EcoGrowth"));


app.listen(port, () => {
  console.log(`Vai a vedere il mio sito! - ` + 'porta numero ' + port)
})



