const express = require('express');
const mysql = require('mysql');

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
    password : 'Andry1949!',
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

    if(cmd == "ModifyUser"){
        var sqlSelect = "SELECT Nome_utente FROM Users WHERE NOT IdUtente = '"+ req.query.IdUtente +"'  AND Nome_utente = '"+ req.query.username +"';";
        console.log("USERNAME:"+req.query.username + " Id:"+ req.query.IdUtente);
        db.query(sqlSelect, (err, result) =>{
            if(result.length == 0){
                console.log("E POSSIBILE AGGIORNARE L'UTENTE");
                var sql = "UPDATE Users SET Nome_utente = '"+ req.query.username +"', Password = '"+ req.query.password +"', Nome = '"+ req.query.nome +"', Cognome = '"+ req.query.cognome +"', Anni = '"+ req.query.anni +"', Sesso = '"+ req.query.sesso +"', Ruolo = '"+ req.query.ruolo +"'WHERE Nome_utente = '"+ req.query.oldusername +"';";
                db.query(sql, (err, result) =>{
                    if(err)
                        console.log(err);
                    else
                        console.log("UTENTE AGGIORNATO");
                });
            }else{
                console.log("UTENTE TROVATO");
            }
            res.send(result);
        });
    }else if(cmd == "getSpecificoTodo"){
        var sqlGet = "SELECT * FROM todo_done_DB WHERE id = '"+ req.query.IdCosa +"';";
        
        db.query(sqlGet, (err, result) =>{
            if(err)
                console.log(err);
            else
                res.send(result);
                console.log(result);
        });
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
    }else if(cmd == "getList"){
        if(req.query.stato == "all"){
            if(req.query.Ruolo == "admin" || req.query.Ruolo == "super admin"){
                var sqlSelect ="SELECT * FROM todo_done_DB;";
            }
            else{
                var sqlSelect ="SELECT * FROM todo_done_DB WHERE IdUtente = "+ req.query.IdUtente +";";
            }
        }else{
            if(req.query.Ruolo == "admin" || req.query.Ruolo == "super admin"){
                var sqlSelect ="SELECT * FROM todo_done_DB WHERE stato = '"+ req.query.stato +"';";
            }
            else{
                var sqlSelect ="SELECT * FROM todo_done_DB WHERE IdUtente = "+ req.query.IdUtente +" AND stato = '"+ req.query.stato +"';";
            }
        }
        db.query(sqlSelect, (err, result) =>{
            if(err)
                console.log(err);
            else
                res.send(result);
                console.log(result);
        });
    }else if (cmd == "modifyTodo"){
        if(req.query.Ruolo == "admin" || req.query.Ruolo == "super admin"){
            console.log("sono admin");
            var sqlUpdate ="UPDATE todo_done_DB SET cosa = '"+ req.query.cosa +"', stato = '"+ req.query.stato +"' WHERE id = '"+ req.query.IdModifica +"';";        
        }
        else{
            console.log("non sono admin");
            var sqlUpdate ="UPDATE todo_done_DB SET cosa = '"+ req.query.cosa +"', stato = '"+ req.query.stato +"' WHERE IdUtente = '"+ req.query.IdUtente +"'AND id = '"+ req.query.IdModifica +"';";        
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

        var sqlControllaLista = "SELECT * FROM todo_done_DB;";

        db.query(sqlControllaLista, (err, result) =>{
            if(result.length == 0){
                console.log("auto");
                var sqlIncrement = "ALTER TABLE todo_done_DB AUTO_INCREMENT = 1;";
                db.query(sqlIncrement, (err) =>{
                    if(err)
                        console.log(err);
                    else    
                        console.log("LISTA VUOTA E INCREMENT = 0");
                })
            }else{
                console.log("controllo fallito utenti");
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