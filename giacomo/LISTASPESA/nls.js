const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const fs = require('fs');

app.use(express.static("home"));

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



router.get('/home',function(req,res){
  res.sendFile(path.join(__dirname + '/LISTASPESA/home/index.html'));
});

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname + '/LISTASPESA/index.html'));
});

app.get('/request', function(req,res){
var sql="SELECT * FROM pcto2022.todo";
console.log(sql);
  conn.query(sql, function(err , result)
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


  var sql = "DELETE FROM pcto2022.todo WHERE id ='" + req.query.id + "';";
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Eliminato: ✔");
  });

});


router.get('/sposta', function(req,res){

    var sql = "UPDATE pcto2022.todo SET stato ='done' where id ='" + req.query.id + "'; ";
    console.log(sql);
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Spostato: ✔");
  });

});


// var sql1 = "SELECT cosa FROM pcto2022.lista where cosa = '" + req.query.cosa + "';";
//     conn.query(sql1, function (err, result) {
//       if(result.length == 0 || result[0].cosa == req.query.modificare){
//         var sql = "UPDATE pcto2022.lista SET cosa = '" + req.query.cosa + "', stato = '" + req.query.stato + "' WHERE cosa = '" + req.query.modificare + "';";
//         conn.query(sql, function (err, result) {
//           if (err) throw err;
//           console.log("Modificato: ✔");
//         });
//       }
//       else{
//         console.log("Elemento già presente!");
//         res.send("Elemento già presente!");
//       }
//     });

router.get('/Signin', function(req,res){ 
  var sql1 = "SELECT username FROM pcto2022.login where username = '" + req.query.username + "';";
  conn.query(sql1, function (err, result) {
    if (result.length == 0){
      var sql = "INSERT INTO pcto2022.login(username, password) VALUES ('" + req.query.username + "', '" + req.query.password + "');";
      conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Aggiunto utente: ✔");
      });
    }
    else{
      console.log("Utente già presente!");
    }
    res.send(result);
  });
});

router.get('/login', function(req,res){ 
  var sql1 = "SELECT password FROM pcto2022.login where username = '" + req.query.username + "';";
  conn.query(sql1, function (err, result) {
    if(err) throw err;
    res.send(result);
    
  });
});


app.use('/', router);
app.listen(process.env.port || 8080);

console.log('Running at Port 8080');
