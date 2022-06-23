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
      
      con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      }); 



app.get('/', function (req, res) {
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
        con.query("select * from datab.todo", function (err, result) {
            if (err) throw err;
            res.send(result);
            console.log('ho letto');
          });
    
    }
    else if (cmd == "newchore") {
        fs.readFile(path.join(__dirname, "/LISTASPESA/json/data.json"), "utf8", function (err, json) {
            if (err) res.end("ERRORE: " + err);

            data = JSON.parse(json);
            var newObj = {
                "cosa": `${req.query.cosa}`,
                "stato": `${req.query.stato}`
            };
            data.push(newObj);

            fs.writeFile(path.join(__dirname, "/LISTASPESA/json/data.json"), JSON.stringify(data), function (err) {
                if (err) res.end("ERRORE: " + err);
                res.send("OK");
            });
        });
    } else if (cmd == "deleteTodo") {
        fs.readFile(path.join(__dirname, "/LISTASPESA/json/data.json"), "utf8", function (err, json) {
            if (err) res.end("ERRORE: " + err);
            data = JSON.parse(json);
            if (data.length == 0) res.send("[{'Cosa' : 'No data', 'Stato' : 'No data'}]");

            for (var i = 0; i < data.length; i++) {
                var array=data[i];
                if (array.cosa == req.query.cosa) {
                    data.splice(i, 1);
                    break;
                }
            }

            fs.writeFile(path.join(__dirname, "/LISTASPESA/json/data.json"), JSON.stringify(data), function (err) {
                if (err) res.end("ERRORE: " + err);
                res.send("OK");
                console.log('ok');
            });
        });
    } else if (cmd == "changeStatus") {
        // fs.readFile(path.join(__dirname, "/LISTASPESA/json/data.json"), "utf8", function (err, json) {
        //     if (err) res.end("ERRORE: " + err);
        //     data = JSON.parse(json);
        // con.connect(function(err) {
        //     if (err) throw err;
        var sql="UPDATE todo SET stato='done' WHERE cosa= '" +req.query.cosa+ "'";
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
    }
});





app.listen(port, () => {
    console.log('listening on port ' + port);
})