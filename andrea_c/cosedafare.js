var mysql = require('mysql');
const express = require('express')
var fs = require('fs');
app = express()
// const router = express.Router();
const path = require('path')
const port = 3000


app.use(express.static('LISTASPESA'));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "finsoft",
    database: "datab"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/LISTASPESA/login.html'));
});

app.get('/adminSpace', function (req, res) {
    res.sendFile(path.join(__dirname, '/LISTASPESA/admin.html'));
});

app.get('/logout', function (req, res) {
    res.sendFile(path.join(__dirname, '/LISTASPESA/logout.html'));
});
app.get('/registrazione', function (req, res) {
    res.sendFile(path.join(__dirname, '/LISTASPESA/registrazione.html'));
});

app.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname, '/LISTASPESA/tododone.html'));
});

app.get('/dafare', (req, res) => {
    res.sendFile(path.join(__dirname, '/LISTASPESA/dafare.html'));
});

app.get('/fatte', function (req, res) {
    res.sendFile(path.join(__dirname, '/LISTASPESA/dafare.html'));
});

app.get('/json', function (req, res) {
    cmd = req.query.cmd;
    console.log(`CMD: ${cmd}`);

    if (cmd == "getList") {
        // fs.readFile(path.join(__dirname, "/LISTASPESA/json/data.json"), "utf8", function (err, json) {
        //     if (err) res.end("ERRORE: " + err);

        //     res.send(json);
        //     console.log(json);
        // });

        con.query("select * from datab.todo" + req.query.tabella + "", function (err, result) {
            if (err) throw err;
            res.send(result);
            console.log('ho letto');
        });

    }
    else if (cmd == "newchore") {
        // fs.readFile(path.join(__dirname, "/LISTASPESA/json/data.json"), "utf8", function (err, json) {
        //     if (err) res.end("ERRORE: " + err);

        //     data = JSON.parse(json);
        //     var newObj = {
        //         "cosa": `${req.query.cosa}`,
        //         "stato": `${req.query.stato}`
        //     };
        //     data.push(newObj);

        //     fs.writeFile(path.join(__dirname, "/LISTASPESA/json/data.json"), JSON.stringify(data), function (err) {
        //         if (err) res.end("ERRORE: " + err);
        //         res.send("OK");
        //     });
        // });
        var sql = "INSERT INTO datab.todo" + req.query.tabella + " (cosa, stato) VALUES('" + req.query.cosa + "', '" + req.query.stato + "')";
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log('gonna add');
            res.send(result);
        });
    } else if (cmd == "deleteTodo") {
        // fs.readFile(path.join(__dirname, "/LISTASPESA/json/data.json"), "utf8", function (err, json) {
        //     if (err) res.end("ERRORE: " + err);
        //     data = JSON.parse(json);
        //     if (data.length == 0) res.send("[{'Cosa' : 'No data', 'Stato' : 'No data'}]");

        //     for (var i = 0; i < data.length; i++) {
        //         var array=data[i];
        //         if (array.cosa == req.query.cosa) {
        //             data.splice(i, 1);
        //             break;
        //         }
        //     }

        //     fs.writeFile(path.join(__dirname, "/LISTASPESA/json/data.json"), JSON.stringify(data), function (err) {
        //         if (err) res.end("ERRORE: " + err);
        //         res.send("OK");
        //         console.log('ok');
        //     });
        // });
        var sql = "DELETE FROM datab.todo" + req.query.tabella + " WHERE id=" + req.query.id;
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log('gonna delete');
            res.send(result);
        });

    } else if (cmd == "changeStatus") {
        // fs.readFile(path.join(__dirname, "/LISTASPESA/json/data.json"), "utf8", function (err, json) {
        //     if (err) res.end("ERRORE: " + err);
        //     data = JSON.parse(json);
        // con.connect(function(err) {
        //     if (err) throw err;
        var sql = "UPDATE datab.todo" + req.query.tabella + " SET stato='done' WHERE id=" + req.query.id;
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log('gonna change');
            res.send(result);
        });

        //   });

        // for (var i = 0; i < data.length; i++) {
        //     if (data[i].cosa == req.query.cosa) {
        //         data[i].stato = "done";
        //         break;
        //     }
        // }

        // fs.writeFile(path.join(__dirname, "/LISTASPESA/json/data.json"), JSON.stringify(data), function (err) {
        // if (err) res.end("ERRORE: " + err);
        // res.send("OK");

        // });
        // });
    } else if (cmd == "login") {
        var sql = "SELECT * FROM utenti WHERE username='" + req.query.username + "';";
        console.log(sql);
        con.query(sql, function (err, result) {
            res.send(result);
        });
    }
    else if (cmd == "controlAccount") {
        var sql = "SELECT * FROM utenti WHERE username='" + req.query.username + "';";
        console.log(sql);
        con.query(sql, function (err, result) {
            res.send(result);
        });
    }
    else if (cmd == "createAccount") {
        var rolo = 'none';
        var sql = "INSERT INTO datab.utenti (username, password, ruolo) VALUES('" + req.query.username + "', '" + req.query.password + "', '" + rolo + "' );";
        console.log(sql);
        con.query(sql, function (err, result) {
            console.log('registrando...');
            res.send(result);
        });
    } else if (cmd == "createTable") {
        var sql = "CREATE TABLE datab.todo"+req.query.tabella+" (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, cosa VARCHAR(128) NOT NULL, stato VARCHAR(128) NOT NULL);";
        console.log(sql);
        con.query(sql, function (err, result) {
            res.send(result);
        });
    }    if (cmd == "tabUtenti") {
        con.query("select * from datab.utenti", function (err, result) {
            if (err) throw err;
            res.send(result);
            console.log('invio utenti');
        });

    }else if (cmd == "controlRole") {
        var sql = "SELECT * FROM utenti WHERE id='" + req.query.id + "';";
        console.log(sql);
        con.query(sql, function (err, result) {
            res.send(result);
        });
    }else if (cmd == "adminizzaN") {
        var sql = "UPDATE datab.utenti SET ruolo='admin' WHERE id=" + req.query.id;
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log('adminizzato');
            res.send(result);
        });
    } else if (cmd == "adminizzaA") {
        var sql = "UPDATE datab.utenti SET ruolo='none' WHERE id=" + req.query.id;
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log('adminizzato');
            res.send(result);
        });
    } 

});





app.listen(port, () => {
    console.log('listening on port ' + port);
})