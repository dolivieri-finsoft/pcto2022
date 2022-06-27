const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const fs = require("fs");
app.use(express.static("pagine"));
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "finsoft",
  database: "pcto2022"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


router.get('/home',function(req,res){
  res.sendFile(path.join(__dirname+'/pagine/home/index.html'));
});

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/pagine/index.html'));
});

router.get('/request',function(req,res){
  var sql = "SELECT * FROM pcto2022.todo";
  con.query(sql, function (err, result){
    if(err) throw err;
    res.send(result);
  });
});

router.get('/write',function(req,res){
  var sql1 = "select cosa from pcto2022.todo where cosa = '" + req.query.cosa + "';";
  con.query(sql1, function (err, result) {
    if (result.length == 0){
      var sql = "INSERT INTO pcto2022.todo (cosa, stato) VALUES ('" + req.query.cosa + "', '" + req.query.stato + "');";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
    }
    else{
      res.send(result);
      console.log("Errore");
    }
  });
});

router.get('/modify',function(req,res){

  var sql1 = "select cosa from pcto2022.todo where cosa = '" + req.query.cosa + "';";
  con.query(sql1, function (err, result) {
    if(result.length == 0 || result[0].cosa == req.query.cosaDaMo){
      var sql = "UPDATE pcto2022.todo SET cosa = '" + req.query.cosa + "', stato = '" + req.query.stato + "' WHERE cosa = '" + req.query.cosaDaMo + "';";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record modified");
      });
    }
    else{
      res.send(result);
      console.log("Errore");
    }
  });
});

router.get('/delete',function(req,res){
  var sql = "DELETE FROM pcto2022.todo WHERE cosa = '" + req.query.cosa + "';";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  });
});

router.get('/change',function(req,res){
  var sql = "UPDATE pcto2022.todo SET stato = 'done' WHERE cosa = '" + req.query.cosa + "';";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record changed");
  });
});

router.get('/login',function(req,res){
  var sql1 = "select password from pcto2022.users where username = '" + req.query.user + "';";
  con.query(sql1, function (err, result) {
      if(err) throw err;
      res.send(result);
  });
});

router.get('/sign',function(req,res){

  var sql1 = "select username from pcto2022.users where username = '" + req.query.user + "';";
  con.query(sql1, function (err, result) {
    if (result.length == 0){
      var sql1 = "insert into pcto2022.users(username, password, role) values ('" + req.query.user + "', '" + req.query.pass + "', 'user');";
      con.query(sql1, function (err, result) {
          if(err) throw err;
          console.log("1 user inserted");
      });
    }
    else{
      console.log("Errore");
    }
    res.send(result);
  });
});

router.get('/deleteAccount',function(req,res){
  var sql = "DELETE FROM pcto2022.users WHERE username = '" + req.query.user + "';";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 user deleted");
  });
});


app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Applicazione pronta alla porta 3000');