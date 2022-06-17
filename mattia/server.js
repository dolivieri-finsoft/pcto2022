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
        if(err) res.end("ERRORE: " + err);
        res.send(json);
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});