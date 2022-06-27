const express = require('express');
const mysql = require('mysql');

var IdUtente = 0;

const app = express();
var port = 3000;

app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
})

app.use(express.static("static"));

app.get('/', function (req, res) {
    res.sendfile(path.join(__dirname, '/'));
});

app.get('/home', function (req, res) {
    res.sendfile(path.join(__dirname, '/home'));
});

// Create connection SQL
 const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'finsoft',
    database : 'TODO_DONE'
 });
 
 db.connect((err) => {
    if(err){
        console.log(err);
    }else{
        console.log('mysql Connected.....');
    }
 })

 // JSON
const path = require('path');
const fs = require('fs');

app.get('/mysql', function (req, res) {
    cmd = req.query.cmd;
    console.log(`CMD: ${cmd}`);

    if(cmd == "getIdUtente"){
        var sql = "SELECT IdUtente FROM Users WHERE Nome_Utente = '"+ req.query.username +"';";
        db.query(sql, (err, result)=> {
            if(err)
                console.log("ERRORE");
            else{
                console.log("Id trovato");
                res.send(result);
            }
        });
    }else if(cmd == "loginUser"){
        var sql = "SELECT Password from Users WHERE Nome_utente = '"+ req.query.username + "';";
        db.query(sql, (err, result) =>{
            if(err)
                console.log("ERRORE");
            else{
                console.log("TROVATO");
                res.send(result);
            }
        });
    }else if(cmd == "addUser"){
        var sqlSelect = "SELECT Nome_utente FROM Users WHERE Nome_utente = '" + req.query.username +"';";

        db.query(sqlSelect, (err, result) =>{
            if(result.length == 0){
                var sql = "INSERT INTO Users(Nome_utente, Password, Nome, Cognome, Anni, Sesso) VALUES ('"+ req.query.username +"', '"+ req.query.password +"', '"+ req.query.nome +"', '"+ req.query.cognome +"', '"+ req.query.eta +"', '"+ req.query.sesso +"');";
                db.query(sql, (err, result) =>{
                    if(err)
                        console.log(ERROE);
                    else
                        console.log("1 user inserted");
                });
            }else{
                console.log("Errore");
            }
            res.send(result);
        });
    }else if (cmd == "getListTodo") {
        var sqlSelect ="SELECT * FROM todo_done_DB WHERE stato = 'todo' AND IdUtente = '"+ req.query.IdUtente +"'";

        db.query(sqlSelect, (err, result) =>{
            if(err)
                console.log(err);
            else
                res.send(result);
                console.log(result);
        });
    }else if(cmd == "getList"){
        var sqlSelect ="SELECT * FROM todo_done_DB WHERE IdUtente = '"+ req.query.IdUtente +"'";

        db.query(sqlSelect, (err, result) =>{
            if(err)
                console.log(err);
            else
                res.send(result);
                console.log(result);
        });
    }else if(cmd == "getListDone"){
        var sqlSelect ="SELECT * FROM todo_done_DB WHERE stato = 'done' AND IdUtente = '"+ req.query.IdUtente +"'";

        db.query(sqlSelect, (err, result) =>{
            if(err)
                console.log(err);
            else
                res.send(result);
                console.log(result);
        });
    }else if (cmd == "modifyTodo"){
        var sqlUpdate ="UPDATE todo_done_DB SET cosa = '"+ req.query.cosa +"', stato = '"+ req.query.stato +"' WHERE cosa = '"+ req.query.modificare +"' AND IdUtente = '"+ req.query.IdUtente +"';";        
        db.query(sqlUpdate, (err) => {
            if (err)
                console.log(err);
            else{
                console.log("Modificato");
                res.send("OK");
            }
        });

    }else if (cmd == "newTodo") {
        var sqlInsert = "INSERT INTO todo_done_DB (cosa, stato, IdUtente) VALUES ('" + req.query.cosa + "', '" + req.query.stato + "', '"+ req.query.IdUtente +"');";
        
        db.query(sqlInsert, (err) => {
            if (err)
                console.log(err);
            else{
                console.log("Dati Inseriti");
                res.send("OK");
            }
        });
    }else if (cmd == "deleteTodo") {
       var sqlDelete = "DELETE FROM todo_done_DB WHERE cosa='"+ req.query.cosa +"' AND IdUtente = '"+ req.query.IdUtente +"';";

        db.query(sqlDelete, (err) => {
            if (err)
                console.log(err);
            else{
                console.log("Dati Eliminati");
                res.send("OK");
            }
        });
    } else if (cmd == "todoFatto") {
        var sqlSelect ="UPDATE todo_done_DB SET stato = 'Done' WHERE cosa = '"+ req.query.cosa +"' AND IdUtente = '"+ req.query.IdUtente +"';";
        
        db.query(sqlSelect, (err) => {
            if (err)
                console.log(err);
            else{
                console.log("Spostato");
                res.send("OK");
            }
        });
    }
});

 