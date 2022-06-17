var express = require('express'),
    app = express();
var fs = require('fs');
const { dir } = require('console');
const path = require('path');

const {azioni} = require("./public/JSON/azioni")

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
    //res.sendFile(path.join(__dirname, './public/pages/todo/'))
    //res.send(azioni[0])
    //let json = JSON.parse(azioni)
    //res.send(json[0])
    //let codice = "<h1>TODOLIST</h1> <ul>"
    res.write("<h1>TODOLIST</h1> <ul>")
    for (let i = 0; i < azioni.length; i++) {
       res.write("<li>" + azioni[0].cosa + ' ' + azioni[i].stato + "</li>")
       //codice += "<li>" + azioni[0].cosa + " " + azioni[i].stato + "</li>"
    }
    //codice += "</ul>"
    res.write('</ul>')

})

app.get('/data', function (req, res){
    res.json(azioni)
})

app.get('/:file', function(req, res) {
    var html = fs.readFileSync(path.join(__dirname, './public/pages/todo/'));
    var $ = cheerio.load(html);
    var scriptNode = '<h1>TODOLIST</h1> <ul>';
    for (let i = 0; i < azioni.length; i++) {
        //res.write("<li>" + azioni[0].cosa + ' ' + azioni[i].stato + "</li>")
        scriptNode += "<li>" + azioni[0].cosa + " " + azioni[i].stato + "</li>"
     }
     scriptNode += "</ul>"
    $('body').append(scriptNode);
    res.send($.html());
  });

app.all('*', function (req, res){
    res.send('<h1 style="text-align: center">PAGINA NON GESTITA</h1>');
})

console.log("Server hostato su http://localhost:3000");
