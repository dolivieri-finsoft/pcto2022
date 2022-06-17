const express = require('express');
const body = require('body-parser');
const app = express();
const port = 3000;


app.use(body.urlencoded({extended:false}));


app.use(express.static("/home/finsoft/Documenti/express"));

app.get('/login', function(req, res) {
    res.sendFile(__dirname + "/login.html");
    
});

app.post('/main', function(req, res){

    if(req.body.username == "Matteo" && req.body.password == "1234"){
        res.sendFile(__dirname + "/index.html");
    } else {
        res.sendFile(__dirname + "/login.html");
    }

});




app.listen(port, function() {
    console.log('Porta: 3000')
});