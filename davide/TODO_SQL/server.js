const express = require('express');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Finsoft1234@",
    database: 'finsoft_db',
    port: 3306,
    //insecureAuth : true
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

const app = express();

//#region root dell pagine
app.use(express.static("public"));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname, './public/pages/home/index.html'));
});

app.get('/form', function (req, res) {
    res.sendFile(path.join(__dirname, './public/pages/form/index.html'))
})

app.get('/prieces', function (req, res) {
    res.sendFile(path.join(__dirname, './public/pages/prieces/index.html'))
})

app.get('/room', function (req, res) {
    res.sendFile(path.join(__dirname, './public/pages/room/index.html'))
})

app.get('/service', function (req, res) {
    res.sendFile(path.join(__dirname, './public/pages/service/index.html'))
})

app.get('/todo', function (req, res) {
    res.sendFile(path.join(__dirname, './public/pages/todo/index.html'))
})

app.get('/userManager', function (req, res) {
    res.sendFile(path.join(__dirname, './public/pages/userManager/index.html'))
})

app.get('/error', function (req, res) {
    res.sendFile(path.join(__dirname, './public/pages/error/index.html'))
})
//#endregion

app.get('/data', function (req, res) {
    comando = req.query.cmd;
    console.log("comando data")
    console.log(`Comando: ${comando}`);

    switch (comando) {
        case 'getList':
            con.query("SELECT * FROM lista", function (err, result, fields) {
                if (err) throw err;
                //console.log(result);
                res.send(result);
            });
            break;
        case 'newTodo':
            // console.log(req.query.task, req.query.stato)
            var sql = "INSERT INTO lista (task, stato) VALUES ('" + req.query.task + "', '" + req.query.stato + "');";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
            break;
        case 'deleteTodo':
            var sql = "DELETE FROM lista WHERE task = '" + req.query.task + "';";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Number of records deleted: " + result.affectedRows);
            });
        case 'todoFatto':
            var sql = "UPDATE lista SET stato = 'done' WHERE task = '" + req.query.task + "';";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " record updated");
            });
            break;
        case 'modifyTodo':
            var sql = "UPDATE lista SET task = '" + req.query.task + "' WHERE task = '" + req.query.whatTask + "';";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " record updated");
            });
            var sql = "UPDATE lista SET stato = '" + req.query.status + "' WHERE task = '" + req.query.whatTask + "';";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " record updated");
            });
            break;
        case 'check_user':
            var sql = "SELECT * FROM utenti WHERE username = '" + req.query.user + "' AND password = '" + req.query.password + "';";
            console.log(sql);
            con.query(sql, function (err, result) {
                if (err) throw err;
                res.send(result);
            });
            break;
        case 'add_user':
            var sql = "INSERT INTO utenti (username, password, role) VALUES ('" + req.query.user + "', '" + req.query.password + "', '" + req.query.role + "');";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                res.send(result)
            });
            break;
        case 'delete_user':
            var sql = "DELETE FROM utenti WHERE username = '" + req.query.user + "';";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                res.send(result)
            });
            break;
        case 'modifyUser':
            var sql = "UPDATE utenti SET username = '" + req.query.user + "' WHERE username = '" + req.query.whatUser + "';";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " record updated");
            });
            var sql = "UPDATE utenti SET password = '" + req.query.pass + "' WHERE username = '" + req.query.whatUser + "';";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " record updated");
            });
            var sql = "UPDATE utenti SET role = '" + req.query.role + "' WHERE username = '" + req.query.whatUser + "';";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " record updated");
                res.send(result);
            });
            break;
        case 'getUser':
            var sql = "SELECT username, role FROM utenti;";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("user send");
                console.log(result);
                res.send(result);
            });
            break;
        default:
            res.sendFile(path.join(__dirname, '/public/index.html'));
    }
});

app.listen(3000, () => {
    console.log(`Serving on http://localhost:3000`);
});