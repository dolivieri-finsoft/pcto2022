var express = require('express'),
    app = express();
var fs = require('fs');
const path = require('path');

app.use(express.static("public"));

app.get('/',function (req,res) {
        res.sendFile(path.join(__dirname, '/public/index.html'));
        })
.listen(3000);

app.get('/home',function (req,res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/form', function (req, res){
    res.sendFile(path.join(__dirname, './public/pages/form/index.html'))
})

app.get('/prieces', function (req, res){
    res.sendFile(path.join(__dirname, './public/pages/prieces/index.html'))
})

app.get('/room', function (req, res){
    res.sendFile(path.join(__dirname, './public/pages/room/index.html'))
})

app.get('/service', function (req, res){
    res.sendFile(path.join(__dirname, './public/pages/service/index.html'))
})

app.get('/todo', function (req, res){
    res.sendFile(path.join(__dirname, './public/pages/todo/index.html'))
})

//app.get('/data', function (req, res){
//    fs.readFile("public/JSON/azioni.json", "utf8", function(err, json){
//        if(err) res.end("ERRORE: " + err);
//        res.send(json);
//    });
//})

app.get('/data', function (req, res) {
    comando = req.query.cmd;
    console.log(`Comando: ${comando}`);

    if (comando == "getList") {
        fs.readFile("./public/JSON/data.json", "utf8", function (err, json) {
            if (err) res.end("ERRORE: " + err);
            res.send(json);
        });
    } else if (comando == "newTodo") {
        fs.readFile("./public/JSON/data.json", "utf8", function (err, json) {
            if (err) res.end("ERRORE: " + err);
            console.log(req.query.cosa, req.query.stato)
            data = JSON.parse(json);
            var task = {
                "cosa": `${req.query.cosa}`,
                "stato": `${req.query.stato}`
            };
            data.push(task);

            console.log(data);

            fs.writeFile("public/JSON/data.json", JSON.stringify(data), function (err) {
                if (err) res.end("ERRORE: " + err);
                res.send("OK");
            });
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
    }
});

console.log("Server hostato su http://localhost:3000");
