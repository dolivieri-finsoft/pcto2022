const express = require('express')
const app = express()
const port = 2424

app.use(express.static('./'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/todo.html");
})

app.listen(port, () => {
  console.log("Listening on port "+ port)
})



