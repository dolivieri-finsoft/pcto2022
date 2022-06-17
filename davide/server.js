var express = require('express'),
    app = express();
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
    res.json([{"cosa":"spesa", "stato":"todo"},{"cosa":"riparare bici", "stato":"done"}])
    res.sendFile(path.join(__dirname, './public/pages/todo/'))
})

app.all('*', function (req, res){
    res.send('<h1 style="text-align: center">PAGINA NON GESTITA</h1>');
})

console.log("Server hostato su http://localhost:3000");
