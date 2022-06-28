var express = require('express'),
    app = express();
var fs = require('fs');
const path = require('path');

var mysql = require('mysql');

var con = mysql.createConnection({
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

//#region root dell pagine

app.use(express.static("public"));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})
    .listen(3000);

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
//#endregion

app.get('/data', function (req, res) {
    comando = req.query.cmd;
    console.log(`Comando: ${comando}`);

    if (comando == "getList") {
        con.query("SELECT * FROM lista", function (err, result, fields) {
            if (err) throw err;
            //console.log(result);
            res.send(result);
        });
    } else if (comando == "newTodo") {
        //console.log(req.query.task, req.query.stato)
        var sql = "INSERT INTO lista (task, stato) VALUES ('" + req.query.task + "', '" + req.query.stato + "')";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    } else if (comando == "deleteTodo") {
        fs.readFile("public/JSON/data.json", "utf8", function (err, json) {
            var sql = "DELETE FROM lista WHERE task = '" + req.query.task + "'";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Number of records deleted: " + result.affectedRows);
            });
        });
    } else if (comando == "todoFatto") {
        var sql = "UPDATE lista SET stato = 'done' WHERE task = '"+ req.query.task +"'";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record updated");
        });
    } else if (comando === "modifyTodo") {
        var sql = "UPDATE lista SET task = '"+ req.query.task +"' WHERE task = '"+ req.query.whatTask +"'";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record updated");
        });
        var sql = "UPDATE lista SET stato = '"+ req.query.status +"' WHERE task = '"+ req.query.whatTask +"'";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record updated");
        });
    } else if (comando === "check_user"){
        var sql = "SELECT * FROM utenti WHERE username = '"+ req.query.user + "' AND password = '" + req.query.password + "'"; 
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);

        });
    } else if (comando === "add_user"){
        var sql = "INSERT INTO utenti (username, password) VALUES ('" + req.query.user + "', '" + req.query.password + "')";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    }
});

console.log("Server hostato su http://localhost:3000");