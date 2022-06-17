const express = require('express');
const path = require('path');
const fs = require('fs');

app = express();
const port = 8080;

app.use(express.static("static"));

app.get('/', function (req, res) {
    res.sendfile(path.join(__dirname, '/static/index.html'));
})

app.get('/home', function (req, res) {
    res.sendfile(path.join(__dirname, '/static/home/index.html'));
})

app.get('/json', function (req, res) {
    fs.readFile("json/data.json", "utf8", function(err, json){
        if(err) throw err;
        
        obj = JSON.parse(json);
        var arr0 = obj[0];
        var arr1 = obj[1];
    
        res.write("DATO A: " + arr0.datoA + "\n");
        res.write("DATO B: " + arr0.datoB + "\n");
        res.write("DATO X: " + arr1.datoX + "\n");
        res.write("DATO Y: " + arr1.datoY + "\n");
        res.end();
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});