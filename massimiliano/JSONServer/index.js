const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.static('source'));

app.get('/todo',(req,res) => {
    res.sendFile(__dirname + '/source/content.html');
});

app.get('/*', (req,res) => {
    res.redirect('todo');
});

app.listen(PORT,() => {console.log("Server su porta " + PORT)});