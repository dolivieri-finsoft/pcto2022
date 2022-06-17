const express = require('express')
const app = express()
const port = 8080
const path = require('path')



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'note_Cancemi/login/login.html'))
})

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'note_Cancemi/index.html'))
})

app.use(express.static("note_Cancemi"));


app.listen(port, () => {
  console.log(`Applicazione disponibile alla porta ${port}`)
})