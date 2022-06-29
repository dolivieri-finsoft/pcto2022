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



router.get('/home',function(req,res){
  res.sendFile(path.join(__dirname + '/static/home/index.html'));
});

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname + '/static/index.html'));
});

router.get('/admin',function(req,res){
  res.sendFile(path.join(__dirname+'/static/admin/index.html'));
});

router.get('/request', function(req,res){

  conn.query('SELECT * FROM pcto2022.lista', function(err , result)
  {
  if (err) throw err;
  res.send(result);
  });
});



router.get('/write', function(req,res){

  
  var sql1 = "SELECT cosa FROM pcto2022.lista where cosa = '" + req.query.cosa + "';";
  conn.query(sql1, function (err, result) {
    if (result.length == 0){
      var sql = "INSERT INTO pcto2022.lista (cosa, stato, username) VALUES ('" + req.query.cosa + "', '" + req.query.stato + "', '" + req.query.username + "');";
      conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Aggiunto: ✔");
      });
    }
    else{
      console.log("Elemento già presente!");
      res.send("Elemento già presente!");
    }
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

    var sql1 = "SELECT cosa FROM pcto2022.lista where cosa = '" + req.query.cosa + "';";
    conn.query(sql1, function (err, result) {
      if(result.length == 0 || result[0].cosa == req.query.modificare){
        var sql = "UPDATE pcto2022.lista SET cosa = '" + req.query.cosa + "', stato = '" + req.query.stato + "' WHERE cosa = '" + req.query.modificare + "';";
        conn.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Modificato: ✔");
        });
      }
      else{
        console.log("Elemento già presente!");
        res.send("Elemento già presente!");
      }
    });


});


router.get('/signin', function(req,res){ 
  var sql1 = "SELECT username FROM pcto2022.utenti where username = '" + req.query.username + "';";
  conn.query(sql1, function (err, result) {
    if (result.length == 0){
      var sql = "INSERT INTO pcto2022.utenti (username, password, ruolo) VALUES ('" + req.query.username + "', '" + req.query.password + "', 'utente');";
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
  var sql1 = "select password, ruolo from pcto2022.utenti where username = '" + req.query.username + "';";
  conn.query(sql1, function (err, result) {
    if(err) throw err;
    res.send(result);
    
  });
});

router.get('/deleteAccount', function(req,res){


  var sql = "DELETE FROM pcto2022.utenti WHERE username ='" + req.query.username + "';";
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Eliminato utente: ✔");
    res.send(result);
  });

});



router.get('/lista',function(req,res){
  var sql = "SELECT * FROM pcto2022.utenti";
  conn.query(sql, function (err, result){
    if(err) throw err;
    res.send(result);
  });
});


router.get('/writeUtente', function(req,res){

  
  var sql1 = "SELECT username FROM pcto2022.utenti where username = '" + req.query.username + "';";
  conn.query(sql1, function (err, result) {
    if (result.length == 0){
      var sql = "INSERT INTO pcto2022.utenti (username, password, ruolo) VALUES ('" + req.query.username + "', '" + req.query.password + "', '" + req.query.ruolo + "');";
      conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Aggiunto utente: ✔");
      });
    }
    else{
      console.log("Utente già presente!");
      res.send("Utente già presente!");
    }
  });


});


router.get('/modificaUtente', function(req,res){

  var sql1 = "SELECT username FROM pcto2022.utenti where username = '" + req.query.username + "';";
  conn.query(sql1, function (err, result) {
    if(result.length == 0 || result[0].username == req.query.usernameVecchio){
      var sql = "UPDATE pcto2022.utenti SET username = '" + req.query.username + "', password = '" + req.query.password + "', ruolo = '" + req.query.ruolo + "' WHERE username = '" + req.query.usernameVecchio + "';";
      conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Modificato Utente: ✔");
      });
    }
    else{
      console.log("Utente già presente!");
      res.send("Utente già presente!");
    }
  });


});

router.get('/trova', function(req,res){

  var sql1 = "SELECT password, ruolo FROM pcto2022.utenti where username = '" + req.query.username + "';";

  conn.query(sql1, function(err , result)
  {
  if (err) throw err;
  res.send(result);
  });
});


//add the router
app.use('/', router);
app.listen(process.env.port || 8080);

console.log('Running at Port 8080');