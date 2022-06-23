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
    res.sendFile(path.join(__dirname, './public/index.html'));
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
        console.log(req.query.task, req.query.stato)
        var sql = "INSERT INTO lista (task, stato) VALUES ('"+ req.query.task + "', '"+ req.query.stato +"')";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    } else if (comando == "deleteTodo") {
    fs.readFile("public/JSON/data.json", "utf8", function (err, json) {
        if (err) res.end("ERRORE: " + err);
        data = JSON.parse(json);

        for (var i = 0; i < data.length; i++) {
            if (data[i].cosa == req.query.cosa) {
                data.splice(i, 1);
                break;
            }
        }

        fs.writeFile("public/JSON/data.json", JSON.stringify(data), function (err) {
            if (err) res.end("ERRORE: " + err);
            res.send("OK");
        });
    });
} else if (comando == "todoFatto") {
    fs.readFile("public/JSON/data.json", "utf8", function (err, json) {
        if (err) res.end("ERRORE: " + err);
        data = JSON.parse(json);

        for (var i = 0; i < data.length; i++) {
            if (data[i].cosa == req.query.cosa) {
                data[i].stato = "done";
                break;
            }
        }

        fs.writeFile("public/JSON/data.json", JSON.stringify(data), function (err) {
            if (err) res.end("ERRORE: " + err);
            res.send("OK");
        });
    });
} else if (comando === "modifyTodo") {
    //console.log(req.query.whatTask, req.query.status, req.query.task)
    fs.readFile("public/JSON/data.json", "utf8", function (err, json) {
        if (err) res.end("ERRORE: " + err);

        data = JSON.parse(json);

        for (var i = 0; i < data.length; i++) {
            if (data[i].cosa === req.query.whatTask) {
                data[i].stato = req.query.status;
                data[i].cosa = req.query.task;
                break;
            }
        }

        fs.writeFile("public/JSON/data.json", JSON.stringify(data), function (err) {
            if (err) res.end("ERRORE: " + err);
            res.send("OK");
        });
    });
}
});

console.log("Server hostato su http://localhost:3000");
