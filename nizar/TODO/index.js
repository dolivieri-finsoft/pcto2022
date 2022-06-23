const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const fs = require('fs');

app.use(express.static("static"));

var mysql = require('mysql');

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "finsoft",
  database: "pcto2022"
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});



router.get('/',function(req,res){
  res.sendFile(path.join(__dirname + '/static/index.html'));
});

router.get('/request', function(req,res){

  conn.query('SELECT * FROM pcto2022.lista', function(err , result)
  {
  if (err) throw err;
  res.send(result);
  });
});



router.get('/write', function(req,res){

  var sql = "INSERT INTO pcto2022.lista (cosa, stato) VALUES ('" + req.query.cosa + "', '" + req.query.stato + "');";
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Aggiunto: ✔");
  });




});

router.get('/delete', function(req,res){


  var sql = "DELETE FROM pcto2022.lista WHERE cosa ='" + req.query.cosa + "';";
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Eliminato: ✔");
  });

});


router.get('/sposta', function(req,res){

    var sql = "UPDATE pcto2022.lista SET stato ='done' where cosa ='" + req.query.cosa + "'; ";
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Spostato: ✔");
  });

});

router.get('/modifica', function(req,res){


    var sql = "UPDATE pcto2022.lista SET cosa ='" + req.query.cosa + "', stato = '" + req.query.stato + "' where cosa= '" + req.query.modificare + "';";
    conn.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Modificato: ✔");
    });

});


/*function read(){
  conn.query('SELECT * FROM pcto2022.lista', function(err , result)
  {
  if (err) throw err;
  return result;
  });
}*/



//add the router
app.use('/', router);
app.listen(process.env.port || 8080);

console.log('Running at Port 8080');