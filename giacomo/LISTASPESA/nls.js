const { fstat}= require('fs');
const express = require('express');
const app = express();
const port = 8080;
const path = require('path');


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/home/td.html'));
})
app.get('/request', function (req, res) {
  const fs = require('fs');

  fs.readFile('./json/spesa.json', (err,jsonString) => {
  
    var trasformazione = JSON.parse(jsonString);
  
    res.send(trasformazione);
    })
  
  });
  


app.listen(port, () => {
  console.log('listening on port ' + port)
});

