const express = require('express');
const fs = require('fs');
const bp = require('body-parser');
const app = express();



app.use(express.static("/home/finsoft/Scrivania/github/pcto2022/matteo/express/webserver_2"));

app.use(bp.urlencoded({extended:true}));
app.use(bp.json());



app.get("/", function(req, res){

    res.sendFile(__dirname + "/pg1.html");
})

app.post("/aaaa", function(req, res){
    
    var auxObject = {
        cosa:req.body.cosa,
        stato:"todo"
    }
    console.log(req.body.cosa);
    var data = fs.readFileSync('data.json');

    var parsedJ = JSON.parse(data);

    parsedJ.tasks.push(auxObject);
    console.log(auxObject);

    var dataCorrect = JSON.stringify(parsedJ);

    fs.writeFile('data.json', dataCorrect, err =>{
        if(err) throw err;

        console.log("new data added");
    })
})



app.post('/rewrite', function(req, res){
    console.log(req.body);
    var aux = JSON.stringify(req.body);
    fs.writeFile('data.json', aux, err =>{
        if(err) throw err;
    });
})






app.listen(2900, function(){
    console.log("In ascolto su porta 2900...");
    
})