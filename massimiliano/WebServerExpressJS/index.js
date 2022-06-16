const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.static('source'));

app.get('/*', (req,res) => {
    res.sendFile(__dirname+'/source/home.html');
})

app.listen(PORT, () => {console.log('Server su porta ' + PORT)});