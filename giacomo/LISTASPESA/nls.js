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
  res.sendFile(path.join(__dirname + '/home/index.html'));
});

router.get('/request', function(req,res){

  conn.query('SELECT * FROM pcto2022.todo', function(err , result)
  {
  if (err) throw err;
  res.send(result);
  });
});



router.get('/write', function(req,res){

  var sql = "INSERT INTO pcto2022.todo (cosa, stato) VALUES ('" + req.query.cosa + "', '" + req.query.stato + "');";
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Aggiunto: ✔");
  });




});

router.get('/delete', function(req,res){


  var sql = "DELETE FROM pcto2022.todo WHERE cosa ='" + req.query.cosa + "';";
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Eliminato: ✔");
  });

});


router.get('/sposta', function(req,res){

    var sql = "UPDATE pcto2022.todo SET stato ='done' where cosa ='" + req.query.cosa + "'; ";
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Spostato: ✔");
  });

});

router.get('/modifica', function(req,res){


    var sql = "UPDATE pcto2022.todo SET cosa ='" + req.query.cosa + "', stato = '" + req.query.stato + "' where cosa= '" + req.query.modificare + "';";
    conn.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Modificato: ✔");
    });

});

app.use('/', router);
app.listen(process.env.port || 8080);

console.log('Running at Port 8080');