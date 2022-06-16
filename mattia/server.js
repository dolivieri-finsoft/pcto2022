const express = require('express');
const path = require('path');

app = express();
const port = 8080;

app.use(express.static("static"));

app.get('/', function (req, res) {
    res.sendfile(path.join(__dirname, '/static/index.html'));
})

app.get('/home', function (req, res) {
    res.sendfile(path.join(__dirname, '/static/home/index.html'));
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});