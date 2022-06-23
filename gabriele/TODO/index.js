const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const fs = require("fs");

app.use(express.static("home"));

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "finsoft"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


router.get('/',function(req,res){
   res.sendFile(path.join(__dirname+'/home/index.html'));
});

router.get('/request',function(req,res){
    res.send(Read());
});

router.get('/write',function(req,res){
    var myObject = Read();
    
    var newData = {
      "cosa": `${req.query.cosa}`,
      "stato": `${req.query.stato}`
    };
    
    myObject.push(newData);
    Write(myObject);
});

router.get('/modify',function(req,res){
  var myObject = Read();
  
  for(var i = 0; i < myObject.length; i++){
    if(myObject[i].cosa == req.query.cosaDaMo){
      myObject[i].cosa = req.query.cosa;
      myObject[i].stato = req.query.stato;

      break;
    }
  }
  
  Write(myObject);
});

router.get('/delete',function(req,res){
    var myObject = Read();

    for(var i = 0; i < myObject.length; i++){
      if(myObject[i].cosa == req.query.cosa){
        myObject.splice(i, 1);
        break;
      }
    }
  
    Write(myObject);
});

router.get('/change',function(req,res){
    var myObject = Read();
  
    for(var i = 0; i < myObject.length; i++){
      if(myObject[i].cosa == req.query.cosa){
        myObject[i].stato = "done";
        break;
      }
    }
  
    Write(myObject);
});


function Read(){
    var data = fs.readFileSync("./dati/todo.json", "utf-8");
    return JSON.parse(data);
}

function Write(myObject){
    fs.writeFile("./dati/todo.json", JSON.stringify(myObject), (err) => {
      if (err) throw err;
      console.log("ok");
    });
}



app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Applicazione pronta alla porta 3000');