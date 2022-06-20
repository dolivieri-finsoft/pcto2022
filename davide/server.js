var express = require('express'),
    app = express();
var fs = require('fs');
const path = require('path');

app.use(express.static("public"));

app.get('/',function (req,res) {
        res.sendFile(path.join(__dirname, '/public/'));
        })
.listen(3000);

app.get('/home',function (req,res) {
    res.sendFile(path.join(__dirname, './public/'));
});

app.get('/form', function (req, res){
    res.sendFile(path.join(__dirname, './public/pages/form/'))
})

app.get('/prieces', function (req, res){
    res.sendFile(path.join(__dirname, './public/pages/prieces/'))
})

app.get('/room', function (req, res){
    res.sendFile(path.join(__dirname, './public/pages/room/'))
})

app.get('/service', function (req, res){
    res.sendFile(path.join(__dirname, './public/pages/service/'))
})

app.get('/todo', function (req, res){
    res.sendFile(path.join(__dirname, './public/pages/todo/'))
})

app.get('/data', function (req, res){
    fs.readFile("public/JSON/azioni.json", "utf8", function(err, json){
        if(err) res.end("ERRORE: " + err);
        res.send(json);
    });
})

console.log("Server hostato su http://localhost:3000");
