const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();


router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/home/index.html'));
});

router.get('/request',function(req,res){
    const fs = require("fs");
    fs.readFile('./dati/todo.json', (err, jsonString) => {
        let o = JSON.parse(jsonString);
        res.send(o);
        

    });
});


app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Applicazione pronta alla porta 3000');