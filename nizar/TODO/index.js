const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const fs = require('fs');
const { request } = require('http');



router.get('/',function(req,res){
  res.sendFile(path.join(__dirname + '/Home/index.html'));
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
var myObject = JSON.parse(data);
  

var newData = {
  "cosa": `${req.query.cosa}`,
  "stato": `${req.query.stato}`
};
  
// Adding the new data to our object
myObject.push(newData);
  
// Writing to our JSON file
var newData2 = JSON.stringify(myObject);
fs.writeFile("./Cose/daFare.json", newData2, (err) => {
  // Error checking
  if (err) throw err;
  console.log("New data added");
});

});

router.get('/delete', function(req,res){

  var data = fs.readFileSync("./Cose/daFare.json");
  var myObject = JSON.parse(data);

    for (var i = 0; i < myObject.length; i++) {
        if (myObject[i].cosa == req.query.cosa) {
            myObject.splice(i, 1);
            break;
        }
    }

    fs.writeFile("./Cose/daFare.json", JSON.stringify(myObject), (err) => {
      if (err) throw err;
      console.log("ok");
    });
});






//add the router
app.use('/', router);
app.listen(process.env.port || 8080);

console.log('Running at Port 8080');