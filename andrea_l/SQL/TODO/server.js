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

    if(cmd == "getSpecificoTodo"){
        var sqlGet = "SELECT * FROM todo_done_DB WHERE id = '"+ req.query.IdCosa +"';";
        

    }else if(cmd == "deleteUser"){
        var sqlDelete = "DELETE FROM todo_done_DB WHERE IdUtente = '"+ req.query.IdUtente +"';";
        var sqlDeleteUser ="DELETE FROM Users WHERE IdUtente = '"+ req.query.IdUtente +"';";
        db.query(sqlDelete, (err) => {
            if (err)
                console.log(err);
            else{
                console.log("Dati Eliminati");
                db.query(sqlDeleteUser, (err) =>{
                    if(err)
                        console.log(err);
                    else{
                        console.log("UTENTE ELIMINATO");
                        res.send("OK");
                    }
                });
            }
        });
    }else if(cmd == "getListUser"){
        var sql ="SELECT * FROM Users;"

        db.query(sql, (err, result) =>{
            if(err)
                console.log("ERRORE");
            else{
                console.log("lista utenti trovata");
                console.log(result);
                res.send(result);
            }
        });
    }else if(cmd =="getNomeUtente"){
        var sql = "SELECT Nome_utente FROM Users WHERE IdUtente = '"+ req.query.IdUtente +"';";

        db.query(sql, (err, result)=> {
            if(err)
                console.log("ERRORE");
            else{
                console.log("Nome utente trovato");
                res.send(result);
            }
        });
    }else if(cmd == "getIdUtente"){
        var sql = "SELECT * FROM Users WHERE Nome_Utente = '"+ req.query.username +"';";
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
                console.log("User trovato");
                res.send(result);
            }
        });
    }else if(cmd == "ControlloRuolo"){
        var sqlAdmin = "SELECT Ruolo FROM Users WHERE Ruolo = '"+ req.query.ruolo +"';";
        
        db.query(sqlAdmin, (err, result)=>{
            if(result.length == 0){
                console.log(req.query.ruolo + " non trovato");
                res.send("OK");
            }else{
                console.log(req.query.ruolo + " trovato");
            }
        });
    }else if(cmd == "addUser"){
        var sqlSelect = "SELECT Nome_utente FROM Users WHERE Nome_utente = '" + req.query.username +"';";

        db.query(sqlSelect, (err, result) =>{
            if(result.length == 0){
                var sql = "INSERT INTO Users(Nome_utente, Password, Nome, Cognome, Anni, Sesso, Ruolo) VALUES ('"+ req.query.username +"', '"+ req.query.password +"', '"+ req.query.nome +"', '"+ req.query.cognome +"', '"+ req.query.eta +"', '"+ req.query.sesso +"', '"+ req.query.ruolo +"');";
                db.query(sql, (err, result) =>{
                    if(err)
                        console.log(err);
                    else
                        console.log("1 user inserted");
                });
            }else{
                console.log("Errore");
            }
            res.send(result);
        });
    }else if (cmd == "getListTodo") {
        if(req.query.Ruolo == "admin" || req.query.Ruolo == "super admin"){
            console.log("sono admin");
            var sqlSelect ="SELECT * FROM todo_done_DB WHERE stato = 'todo';";
        }
        else{
            console.log("non sono admin");
            var sqlSelect ="SELECT * FROM todo_done_DB WHERE stato = 'todo' AND IdUtente = "+ req.query.IdUtente +";";
        }


        db.query(sqlSelect, (err, result) =>{
            if(err)
                console.log(err);
            else
                res.send(result);
        });
    }else if(cmd == "getList"){
        if(req.query.Ruolo == "admin" || req.query.Ruolo == "super admin"){
            console.log("sono admin");
            var sqlSelect ="SELECT * FROM todo_done_DB;";
        }
        else{
            console.log("non sono admin");
            var sqlSelect ="SELECT * FROM todo_done_DB WHERE IdUtente = "+ req.query.IdUtente +";";
        }

        db.query(sqlSelect, (err, result) =>{
            if(err)
                console.log(err);
            else
                res.send(result);
                console.log(result);
        });
    }else if(cmd == "getListDone"){
        if(req.query.Ruolo == "admin" || req.query.Ruolo == "super admin"){
            console.log("sono admin");
            var sqlSelect ="SELECT * FROM todo_done_DB WHERE stato = 'Done';";
        }
        else{
            console.log("non sono admin");
            var sqlSelect ="SELECT * FROM todo_done_DB WHERE stato = 'Done' AND IdUtente = "+ req.query.IdUtente +";";
        }

        db.query(sqlSelect, (err, result) =>{
            if(err)
                console.log(err);
            else
                res.send(result);
        });
    }else if (cmd == "modifyTodo"){
        if(req.query.Ruolo == "admin" || req.query.Ruolo == "super admin"){
            console.log("sono admin");
            var sqlUpdate ="UPDATE todo_done_DB SET cosa = '"+ req.query.cosa +"', stato = '"+ req.query.stato +"' WHERE cosa = '"+ req.query.modificare +"'AND id = '"+ req.query.IdModifica +"';";        
        }
        else{
            console.log("non sono admin");
            var sqlUpdate ="UPDATE todo_done_DB SET cosa = '"+ req.query.cosa +"', stato = '"+ req.query.stato +"' WHERE cosa = '"+ req.query.modificare +"' AND IdUtente = '"+ req.query.IdUtente +"'AND id = '"+ req.query.IdModifica +"';";        
        }

        db.query(sqlUpdate, (err) => {
            if (err)
                console.log(err);
            else{
                console.log("Modificato");
                res.send("OK");
            }
        });

    }else if (cmd == "newTodo") {
        var sqlInsert = "INSERT INTO todo_done_DB (cosa, stato, IdUtente, Username) VALUES ('" + req.query.cosa + "', '" + req.query.stato + "', '"+ req.query.IdUtente +"', '"+ req.query.username +"');";

        
        db.query(sqlInsert, (err) => {
            if (err)
                console.log(err);
            else{
                console.log("Dati Inseriti");
                res.send("OK");
            }
        });
    }else if (cmd == "deleteTodo") {
        if(req.query.Ruolo == "admin" || req.query.Ruolo == "super admin"){
            console.log("sono admin");
            var sqlDelete = "DELETE FROM todo_done_DB WHERE cosa='"+ req.query.cosa +"' AND id = '"+ req.query.IdEliminare +"';";
        }
        else{
            console.log("non sono admin");
            var sqlDelete = "DELETE FROM todo_done_DB WHERE cosa='"+ req.query.cosa +"' AND id = '"+ req.query.IdEliminare +"';";
        }
        

        db.query(sqlDelete, (err) => {
            if (err)
                console.log(err);
            else{
                console.log("Dati Eliminati");
                res.send("OK");
            }
        });
    } else if (cmd == "todoFatto") {
        if(req.query.Ruolo == "admin" || req.query.Ruolo == "super admin"){
            console.log("sono admin");
            var sqlSelect ="UPDATE todo_done_DB SET stato = 'Done' WHERE cosa = '"+ req.query.cosa +"'AND id = '"+ req.query.IdSpostare +"';";
        }
        else{
            console.log("non sono admin");
            var sqlSelect ="UPDATE todo_done_DB SET stato = 'Done' WHERE cosa = '"+ req.query.cosa +"' AND IdUtente = '"+ req.query.IdUtente +"'AND id = '"+ req.query.IdSpostare +"';";
        }
        
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

 