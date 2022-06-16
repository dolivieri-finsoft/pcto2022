const express = require('express')
const app = express()
const port = 8080
const path = require('path');

app.use(express.static("EcoGrowth"));

app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'EcoGrowth/index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



