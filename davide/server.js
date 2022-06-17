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

// app.get('/try', function(req, res) {
//     var html = fs.readFileSync(__dirname, '/public/pages/service/todo/index.html', 'utf8');
//     var $ = cheerio.load(html);
//     var scriptNode = '<h1>TODOLIST</h1> <ul>';
//     for (let i = 0; i < azioni.length; i++) {
//         //res.write("<li>" + azioni[0].cosa + ' ' + azioni[i].stato + "</li>")
//         scriptNode += "<li>" + azioni[0].cosa + " " + azioni[i].stato + "</li>"
//      }
//     scriptNode += "</ul>"
//     $('body').append(scriptNode);
//     res.send($.html());
// });

// app.get('/*', function (req, res){
//     res.send('<h1 style="text-align: center">PAGINA NON GESTITA</h1>');
// })

console.log("Server hostato su http://localhost:3000");
