const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

//CREATE CONNECTION

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "finsoft",
    database: "pcto2022"
});

// CONNECTION

db.connect(function(err) {
    if (err) throw err;
    console.log('Connected!');
});

// CREATE DB

app.get('/createdb', (req, res) =>{
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);s
        res.send('database created...');
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});