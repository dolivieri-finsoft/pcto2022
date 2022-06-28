const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const mysql = require('mysql2');
const app = express();
const PORT = 8081;

app.use(express.static('source'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Az-60427",
    database: "tasks"
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected to Database!");
})

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/source/content.html');
})

app.post('/add',(req,res) => {
    const newTask = req.body.value;

    let sql = "INSERT INTO todo (nome) VALUES ('" + newTask  + "')";
    con.query(sql, (err, result) => {
        if(err) throw err;
    });
    res.sendStatus(200);
})

app.post('/remove',(req,res) => {
    const taskSearch = req.body.value;
    const taskStatus = req.body.type;

    let sql = "DELETE FROM "+ taskStatus +" WHERE nome='" + taskSearch + "'";
    con.query(sql, (err, result) => {
        if(err) throw err;
    });
    res.sendStatus(200);
})

app.post('/move',(req,res) => {
    const taskSearch = req.body.value;
    const taskStatus = req.body.type;

    if (taskStatus == "todo"){
        const newStatus = "done";
    } else {
        const newStatus = "todo";
    }

    let sql = "DELETE FROM "+ taskStatus +" WHERE nome='" + taskSearch + "'";
    con.query(sql, (err, result) => {
        if(err) throw err;
    });
    sql = "INSERT INTO "+ newStatus +" (cosa) VALUES ('" + taskSearch + "')";
    con.query(sql, (err, result) => {
        if(err) throw err;
    });
    res.sendStatus(200);
})

app.post('/rename',(req,res) => {
    const taskSearch = req.body.oldValue;
    const taskStatus = req.body.type;
    const newName = req.body.value;
    
    let sql = "UPDATE "+ taskStatus +" SET nome='" + newName + "' WHERE nome='" + taskSearch + "'";
    con.query(sql, (err, result) => {
        if(err) throw err;
    });
    res.sendStatus(200);
})

//Funzioni per /requestData

function getData(tableToRequest){
    return new Promise((resolve,reject)=>{
        let sql = "SELECT * FROM " + tableToRequest;
        con.query(sql,(err, result) => {
            if(err) reject(err);
            resolve(result);
        })
    })
}


//formato [nome: "nome", stato: "nomeTabella"]
app.get('/requestData', async function(req,res){
    const tableTodo = await getData("todo");
    const tableDone = await getData("done");
    const tableTotal = [];
    
    tableTodo.forEach(element => {
        tableTotal.push({nome: element.nome, stato: "todo"})
    });

    tableDone.forEach(element => {
        tableTotal.push({nome: element.nome, stato: "done"});
    });
    console.log(tableTotal);
    res.send(JSON.stringify(tableTotal));
})

app.get('/*', (req,res) => {
    res.redirect('/');
});

app.listen(PORT,() => {console.log("Server su porta " + PORT)});