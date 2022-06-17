const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 8080;

/*
app.get('/*',(req,res,next) => {
    console.log(req.ip + " su " + req.url);
    next();
})
*/

app.use(express.static('source'));
app.use(bodyParser.urlencoded({extended:false}))

app.post('/home',(req,res) => {
    if(req.body.user == '' || req.body.pass == ''){
        res.redirect('login');
        return;
    }
    res.sendFile(__dirname + '/source/home.html'); 
})

app.get('/login',(req,res) => {
    res.sendFile(__dirname+'/source/login.html');
})

app.get('/*', (req,res) => {
    res.redirect('/login');
})

app.listen(PORT, () => {console.log('Server su porta ' + PORT)});