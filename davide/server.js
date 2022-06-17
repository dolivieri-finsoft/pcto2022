var express = require('express'),
    app = express();
const path = require('path');

app.use(express.static("public"));

app.get('/',function (req,res) {
        res.sendFile(path.join(__dirname, '/public/login'));
        })
.listen(8080);

app.get('/login',function (req,res) {
    res.sendFile(path.join(__dirname, './public/login'));
});

app.get('/home',function (req,res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
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
    res.send('ciao');
})

console.log("Server hostato su http://localhost:8080");
