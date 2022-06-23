const express = require('express');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');
const logger = require('./modules/logger.js');

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pcto2022"
});

conn.connect((err) => {
    if (err) throw err;
    console.log("DB Connected!");
});

const app = express();
const log = new logger.Log()
const port = 8000;

app.use(express.static("static"));

app.get('/', function (req, res) {
    res.sendfile(path.join(__dirname, '/'));
});

app.get('/home', function (req, res) {
    res.sendfile(path.join(__dirname, '/home'));
});

app.get('/addTodo', function (req, res) {
    res.sendfile(path.join(__dirname, '/addTodo'));
});

app.get('/deleteTodo', function (req, res) {
    res.sendfile(path.join(__dirname, '/deleteTodo'));
});

app.get('/testMysql', function (req, res) {
    conn.query('SELECT * FROM todo', function (err, response, fields) {
        if (err) throw err;
        res.send(response);
    });
});

app.get('/mysql', function (req, res) {
    cmd = req.query.cmd;
    log.INFO(`CMD: ${cmd}`);

    switch (cmd) {
        case "getList":
            conn.query('SELECT * FROM todo', function (err, response, fields) {
                if (err) res.end(logger.Formatter(500, err));
                res.end(logger.Formatter(200, response));
            });

            break;
        case "newTodo":
            conn.query('SELECT * FROM todo WHERE cosa=?', [req.query.cosa], function (err, response, fields) {
                if (err) res.end(logger.Formatter(500, err));
                if (response.length == 0) {
                    conn.query('INSERT INTO todo (cosa, stato) VALUES (?, ?)', [req.query.cosa, req.query.stato], function (err, response, fields) {
                        if (err) res.end(logger.Formatter(500, err));
                        res.end(logger.Formatter(200, 'OK'));
                    });
                } else {
                    res.end(logger.Formatter(500, 'TODO already exists.'));
                }
            });

            break;
        case "deleteTodo":
            conn.query('DELETE FROM todo WHERE cosa=?', [req.query.cosa], function (err, response, fields) {
                if (err) res.end(logger.Formatter(500, err));
                res.end(logger.Formatter(200, 'OK'));
            });

            break;
        case "todoFatto":
            conn.query('UPDATE todo SET stato="done" WHERE id=?', [req.query.id], function (err, response, fields) {
                if (err) res.end(logger.Formatter(500, err));
                res.end(logger.Formatter(200, 'OK'));
            });

            break;
        case "updateTodo":
            conn.query('UPDATE todo SET cosa=? WHERE id=?', [req.query.cosa, req.query.id], function (err, response, fields) {
                if (err) res.end(logger.Formatter(500, err));
                res.end(logger.Formatter(200, 'OK'));
            });

            break;
        default:
            res.end(logger.Formatter(500, 'Invalid CMD.'));
    }
});

app.get('/json', function (req, res) {
    cmd = req.query.cmd;
    console.log(`CMD: ${cmd}`);

    if (cmd == "getList") {
        fs.readFile("json/data.json", "utf8", function (err, json) {
            if (err) res.end("ERRORE: " + err);

            res.send(json);
        });
    } else if (cmd == "newTodo") {
        fs.readFile("json/data.json", "utf8", function (err, json) {
            if (err) res.end("ERRORE: " + err);

            data = JSON.parse(json);
            var newObj = {
                "cosa": `${req.query.cosa}`,
                "stato": `${req.query.stato}`
            };
            data.push(newObj);

            console.log(data);

            fs.writeFile("json/data.json", JSON.stringify(data), function (err) {
                if (err) res.end("ERRORE: " + err);
                res.send("OK");
            });
        });
    } else if (cmd == "deleteTodo") {
        fs.readFile("json/data.json", "utf8", function (err, json) {
            if (err) res.end("ERRORE: " + err);
            data = JSON.parse(json);
            if (data.length == 0) res.send("[{'Cosa' : 'No data', 'Stato' : 'No data'}}");

            for (var i = 0; i < data.length; i++) {
                if (data[i].cosa == req.query.cosa) {
                    data.splice(i, 1);
                    break;
                }
            }

            fs.writeFile("json/data.json", JSON.stringify(data), function (err) {
                if (err) res.end("ERRORE: " + err);
                res.send("OK");
            });
        });
    } else if (cmd == "todoFatto") {
        fs.readFile("json/data.json", "utf8", function (err, json) {
            if (err) res.end("ERRORE: " + err);
            data = JSON.parse(json);

            for (var i = 0; i < data.length; i++) {
                if (data[i].cosa == req.query.cosa) {
                    data[i].stato = "Done";
                    break;
                }
            }

            fs.writeFile("json/data.json", JSON.stringify(data), function (err) {
                if (err) res.end("ERRORE: " + err);
                res.send("OK");
            });
        });
    }
});

app.listen(port, () => {
    console.log(`Serving on http://localhost:${port}`);
});