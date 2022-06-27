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
app.use(bp.text());

app.use(bp.urlencoded({extended:true}));
app.use(bp.json());



app.get("/", function(req, res){

    res.sendFile(__dirname + "/pg1.html");
})

app.post("/aaaa", function(req, res){
    
    
    var auxVar = req.body.cosa;
    
   
        console.log("Entrato per aggiunta");
        var sql ="INSERT INTO pcto2022.todo (task, stato) VALUES( '" + auxVar + "', 'todo')";
        con.query(sql, function(err, result){
        if(err) throw err;
        console.log("operazione completata");
        
    })
    
})


app.get('/getTable', (req, res) =>{
    var txt = "SELECT * FROM pcto2022.todo";
    
        
        con.query(txt, function(err, result, fields) {
        console.log(JSON.stringify(result));
        res.send(JSON.stringify(result));
        
    });
})

app.post('/removeTask', (req, res) => {
    
    var txt = "DELETE FROM pcto2022.todo WHERE task = '" + req.body + "'";
    console.log(txt);
    
    con.query(txt, function(err, result, fields) {
        
    })
})

app.post('/moveTask', (req, res) => {
    var aux;
    console.log(req.body);
    newAux = req.body.replace(/_/g, " ");
    con.query("SELECT stato FROM pcto2022.todo WHERE task = '" + newAux + "'", function(err, result, fields){
        console.log("Result: " + result);
        var toObj = JSON.parse(result);
        aux = toObj.stato;
    });
    console.log("Tipo della task: " + aux);
    
    if(aux == "todo"){
        txt = "UPDATE pcto2022.todo SET stato = 'done' WHERE task = '" + req.body + "'";      
        con.query(txt, function(err, result, fields){        
            if(err) throw err;
        });
    } else {
        txt = "UPDATE pcto2022.todo SET stato = 'todo' WHERE task = '" + req.body + "'";
        con.query(txt, function(err, result, fields){       
            if(err) throw err;
       });
    }

    console.log("operazione eseguita");
});
  
    



app.post('/rewrite', function(req, res){
    console.log(req.body);
    var aux = JSON.stringify(req.body);
    fs.writeFile('data.json', aux, err =>{
        if(err) throw err;
    });
});


app.listen(2900, function(){
    console.log("In ascolto su porta 2900...");
    
})