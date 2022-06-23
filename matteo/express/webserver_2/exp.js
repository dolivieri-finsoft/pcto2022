const express = require('express');
const fs = require('fs');
const mysql = require('mysql');
const bp = require('body-parser');
const app = express();

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Az95637!",
    database: "pcto2022"
});





var txt = "SELECT * FROM pcto2022.todo";
con.connect((err) => {
    if (err) throw err;
    con.query(txt, function(err, result, fields) {
        console.log(JSON.stringify(result));
    });
});

app.use(express.static("/home/finsoft/Scrivania/github/pcto2022/matteo/express/webserver_2"));

app.use(bp.urlencoded({extended:true}));
app.use(bp.json());



app.get("/", function(req, res){

    res.sendFile(__dirname + "/pg1.html");
})

app.post("/aaaa", function(req, res){
    
    
    var auxVar = req.body.cosa;
    
    con.connect(function(err){
        if(err) throw err;
        console.log("Entrato per aggiunta");
        var sql ="INSERT INTO pcto2022.todo (task, stato) VALUES( '" + auxVar + "', 'todo')";
        con.query(sql, function(err, result){
            if(err) throw err;
            console.log("operazione completata");
        })
    })
    
})


app.get('/getTable', (req, res) =>{
    var txt = "SELECT * FROM pcto2022.todo";
    con.connect((err) => {
        if (err) throw err;
        con.query(txt, function(err, result, fields) {
            console.log(JSON.stringify(result));
            res.send(result);
        });
    });
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