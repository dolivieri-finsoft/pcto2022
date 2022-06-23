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
    database: "lists"
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

    let sql = "INSERT INTO tasks (cosa, stato) VALUES ('" + newTask + "', 'todo')";
    con.query(sql, (err, result) => {
        if(err) throw err;
    });
    res.sendStatus(200);
})

app.post('/remove',(req,res) => {
    const taskSearch = req.body.value;
    const taskStatus = req.body.type;

    let sql = "DELETE FROM tasks WHERE cosa='" + taskSearch + "' AND stato='" + taskStatus + "'";
    con.query(sql, (err, result) => {
        if(err) throw err;
    });
    res.sendStatus(200);
})

app.post('/move',(req,res) => {
    const taskSearch = req.body.value;
    const taskStatus = req.body.type;
    if (taskStatus == "todo"){
        var newStatus = "done";
    } else {
        var newStatus = "todo";
    }

    let sql = "DELETE FROM tasks WHERE cosa='" + taskSearch + "' AND stato='"+ taskStatus +"'";
    con.query(sql, (err, result) => {
        if(err) throw err;
    });
    sql = "INSERT INTO tasks (cosa, stato) VALUES ('" + taskSearch + "','"+ newStatus+ "')";
    con.query(sql, (err, result) => {
        if(err) throw err;
    });
    res.sendStatus(200);
})

app.post('/rename',(req,res) => {
    const taskSearch = req.body.oldValue;
    const taskStatus = req.body.type;
    const newName = req.body.value;
    
    let sql = "UPDATE tasks SET cosa='" + newName + "' WHERE cosa='" + taskSearch + "' AND stato='"+ taskStatus + "'";
    con.query(sql, (err, result) => {
        if(err) throw err;
    });
    res.sendStatus(200);
})

app.get('/requestData', (req,res) => {
    let sql = "SELECT * FROM tasks"
    con.query(sql, (err, result) => {
        res.send(result);
    })
})

app.get('/*', (req,res) => {
    res.redirect('/');
});

app.listen(PORT,() => {console.log("Server su porta " + PORT)});