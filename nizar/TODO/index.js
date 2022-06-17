const express = require('express');
const { fstat } = require('fs');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname + '/Home/index.html'));
  
});

router.get('/page',function(req,res){
  res.sendFile(path.join(__dirname + '/todo/index.html'));
});







//add the router
app.use('/', router);
app.listen(process.env.port || 8080);

console.log('Running at Port 8080');