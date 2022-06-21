const { fstat } = require('fs');
const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const fs = require('fs');


app.use(express.static("home"));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/home/index.html'));
})
app.get('/request', function (req, res) {


  fs.readFile('./json/spesa.json', (err, jsonString) => {

    var trasformazione = JSON.parse(jsonString);

    res.send(trasformazione);
  })

});

app.get('/write', function (req, res) {
  var data = fs.readFileSync("./json/spesa.json", "utf-8");
  return JSON.parse(data);

  var newData = {
    "oggetto": `${req.query.ogg}`,
    "stato": `${req.query.stato}`
  };

  myObject.push(newData);
  
  fs.writeFile("./json/spesa.json", JSON.stringify(myObject), (err) => {
    if (err) throw err;
    console.log("ok");
  });
});



app.get('/delete', function (req, res) {

  var data = fs.readFileSync("./json/spesa.json");
  var oggetto = JSON.parse(data);

  for (var i = 0; i < oggetto.length; i++) {
    if (oggetto[i].oggetto == req.query.oggetto) {
      oggetto.splice(i, 1);
      break;
    }
  }

  fs.writeFile("./json/spesa.json", JSON.stringify(oggetto), (err) => {
    if (err) throw err;
    console.log("Eliminato: ✔");
  });
});


app.get('/cambia', function (req, res) {

  var data = fs.readFileSync("./json/spesa.json");
  var oggetto = JSON.parse(data);


  for (var i = 0; i < oggetto.length; i++) {
    if (oggetto[i].oggetto == req.query.oggetto) {
      oggetto[i].stato = "done";
      break;
    }
  }

  fs.writeFile("./json/spesa.json", JSON.stringify(oggetto), (err) => {
    if (err) throw err;
    console.log("Spostato: ✔");
  });
});

app.listen(port, () => {
  console.log('listening on port ' + port)
});

