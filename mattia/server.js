const express = require('express');
const path = require('path');
const fs = require('fs');

app = express();
const port = 8080;

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
})

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
    console.log(`Listening on port ${port}`);
});