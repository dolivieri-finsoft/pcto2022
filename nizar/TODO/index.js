const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const fs = require('fs');

app.use(express.static("static"));

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "finsoft",
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});



router.get('/',function(req,res){
  res.sendFile(path.join(__dirname + '/static/index.html'));
});

router.get('/request', function(req,res){

  fs.readFile('./Cose/daFare.json', (err,jsonString) => {
  
  var trasformazione = JSON.parse(jsonString);

  res.send(trasformazione);
  })

});

router.get('/write', function(req,res){
  
// Storing the JSON format data in myObject
var data = fs.readFileSync("./Cose/daFare.json");
var oggetto = JSON.parse(data);
  

var newData = {
  "cosa": `${req.query.cosa}`,
  "stato": `${req.query.stato}`
};
  
// Adding the new data to our object
oggetto.push(newData);
  
// Writing to our JSON file
var newData2 = JSON.stringify(oggetto);
fs.writeFile("./Cose/daFare.json", newData2, (err) => {
  // Error checking
  if (err) throw err;
  console.log("Aggiunto: ✔");
});

});

router.get('/delete', function(req,res){

  var data = fs.readFileSync("./Cose/daFare.json");
  var oggetto = JSON.parse(data);

  for(var i = 0; i < oggetto.length; i++){
    if(oggetto[i].cosa == req.query.cosa){
      oggetto.splice(i, 1);
      break;
    }
  }

    fs.writeFile("./Cose/daFare.json", JSON.stringify(oggetto), (err) => {
      if (err) throw err;
      console.log("Eliminato: ✔");
    });
});


router.get('/sposta', function(req,res){

  var data = fs.readFileSync("./Cose/daFare.json");
  var oggetto = JSON.parse(data);
   

    for(var i = 0; i < oggetto.length; i++){
      if(oggetto[i].cosa == req.query.cosa){
      oggetto[i].stato = "done";
      break;
     }
   }

    fs.writeFile("./Cose/daFare.json", JSON.stringify(oggetto), (err) => {
      if (err) throw err;
      console.log("Spostato: ✔");
    });
});

router.get('/modifica', function(req,res){

  var data = fs.readFileSync("./Cose/daFare.json");
  var oggetto = JSON.parse(data);
   

  for(var i = 0; i < oggetto.length; i++){
    if(oggetto[i].cosa == req.query.modificare){
      oggetto[i].cosa = req.query.cosa;
      oggetto[i].stato = req.query.stato;

      break;
    }
  }

    fs.writeFile("./Cose/daFare.json", JSON.stringify(oggetto), (err) => {
      if (err) throw err;
      console.log("Modificato: ✔");
    });
});



//add the router
app.use('/', router);
app.listen(process.env.port || 8080);

console.log('Running at Port 8080');