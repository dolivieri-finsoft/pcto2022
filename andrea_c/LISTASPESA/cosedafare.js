const express = require('express')
var fs = require('fs');
const app = express()
// const router = express.Router();
const path = require('path')
const port = 3000

app.use(express.static('LISTASPESA'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/LISTASPESA/tododone.html'));
});

app.get('/dafare', (req, res) => {
    res.sendFile(path.join(__dirname, '/LISTASPESA/dafare.html'));
//     fs.readFile('./LISTASPESA/tododone.json', (err, json) => {
//         // let json = JSON.parse(json);
//         // res.json(obj);
//         // res.write(typeof json)
//         res.send(json[0]);
//         // res.end()
//     });
});
app.get('/fatte', function (req, res) {
    res.sendFile(path.join(__dirname, '/LISTASPESA/dafare.html'));
//     res.write('FACCENDE DA FARE:\n')
//     fs.readFile("LISTASPESA/tododone.json", "utf8", function (err, json) {
//         if (err) throw err;

//         obj = JSON.parse(json);

//         for (let i = 0; i < obj.length; i++) {
//             const element = obj[i];
//             if (element.stato == "todo") {
//                 res.write(element.cosa + "\n");
//             }

//         }
//         res.end();
//     });
});

// app.get('/fatte', function (req, res) {
//     res.write('FACCENDE COMPLETATE:\n')
//     fs.readFile("LISTASPESA/tododone.json", "utf8", function (err, json) {
//         if (err) throw err;

//         obj = JSON.parse(json);

//         for (let i = 0; i < obj.length; i++) {
//             const element = obj[i];
//             if (element.stato == "done") {
//                 res.write(element.cosa+'\n' );
//             }

//         }
//         res.end();
//     });

// });

app.listen(port, () => {
    console.log('listening on port ' + port)
})