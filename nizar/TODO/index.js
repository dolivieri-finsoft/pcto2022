const express = require('express');
const { fstat } = require('fs');
const app = express();
const path = require('path');
const router = express.Router();


router.get('/',function(req,res){
  res.sendFile(path.join(__dirname + '/Home/index.html'));
});

router.get('/request', function(req,res){
  const fs = require('fs');

  fs.readFile('./Cose/daFare.json', (err,jsonString) => {
  
  var trasformazione = JSON.parse(jsonString);

  res.send(trasformazione);
  })

});





//add the router
app.use('/', router);
app.listen(process.env.port || 8080);

console.log('Running at Port 8080');