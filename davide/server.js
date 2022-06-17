var express = require('express'),
    app = express();
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
    res.json(azioni)

    //res.send("<h1>TODOLIST</h1> <ul>")
    //for (let i = 0; i < azioni.length; i++) {
    //    res.send("<li>", azioni[i].cosa, azioni[i].stato, "</li>")
    //}
    //res.send("</ul>")

})

app.get('/data', function (req, res){
    res.json(azioni)
})

app.all('*', function (req, res){
    res.send('<h1 style="text-align: center">PAGINA NON GESTITA</h1>');
})

console.log("Server hostato su http://localhost:3000");
