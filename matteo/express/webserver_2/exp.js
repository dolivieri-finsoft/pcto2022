const express = require('express');
const fs = require('fs');
const mysql = require('mysql');
const bp = require('body-parser');
const { json } = require('express');
const app = express();

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Az95637!",
    database: "pcto2022"
});


app.engine('html', require('ejs').renderFile);


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

    res.sendFile(__dirname + "/login.html");
})

app.post("/logged", function(req, res){
    console.log(req.body.password);
    txt = "SELECT * FROM pcto2022.users WHERE username = '" + req.body.username + "' && password = '" + req.body.password + "'";
    con.query(txt, function(err, result, fields){
        if(result.length == 0){
            console.log("L'utente non esiste");
        } else {
            console.log(result[0].su);
            res.render(__dirname + "/pg1.html", {isSU:result[0].su});
        }
    })

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
        res.send(JSON.stringify(result));
        
    });
})

app.post('/addUser', (req, res) => {
    sus = 0;
    divisi = req.body.split(" ");
    if(divisi[3]){
        sus = 1;
    } else{
        sus = 0; 
    }
    su = 0;
    
    txt = "INSERT INTO pcto2022.users (username, password, su) VALUES ('" + divisi[0] +"', '" + divisi[1] + "', "+ sus + ");";
    console.log(txt);

    con.query(txt, function(err, result){
        if(err) throw err;
    })
})

app.post('/removeTask', (req, res) => {
    
    var txt = "DELETE FROM pcto2022.todo WHERE task = '" + req.body + "'";
    
    con.query(txt, function(err, result, fields) {
        if(err) throw err;
    })
})

app.post('/moveTask', (req, res) => {
    
    newAux = req.body.replace(/_/g, " ");
    con.query("SELECT stato FROM pcto2022.todo WHERE task = '" + newAux + "'", function(err, result, fields){
        console.log(result[0].stato);
        
        aux = result[0].stato;

    if(aux == "todo"){
        txt = "UPDATE pcto2022.todo SET stato = 'done' WHERE task = '" + newAux + "'";      
        
    } else {
        txt = "UPDATE pcto2022.todo SET stato = 'todo' WHERE task = '" + newAux + "'";
        
    }

    con.query(txt, function(err, result, fields){        
        if(err) throw err;
        res.send(result);
        console.log(txt);
    });

    console.log("operazione eseguita");
    });
    
});
  
    
app.post('/modify', function(req, res){

    console.log(req.body.nomeElemento);
    var txt = "UPDATE pcto2022.todo SET task = '" + req.body.modifica + "' WHERE task = '" + req.body.nomeElemento + "'";
    con.query(txt, function(err, result, fields){
        if(err) throw err;
        console.log(txt);
    })

    window.location.reload();
})


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