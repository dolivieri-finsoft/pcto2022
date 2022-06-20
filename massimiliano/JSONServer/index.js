const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 8081;

app.use(express.static('source'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/source/content.html');
});

app.post('/add',(req,res) => {
    let toAdd = req.body.value;
    const newTask = {cosa: toAdd, stato:"todo"};
    let json = fs.readFileSync('./source/todo.json');
    const data = JSON.parse(json);
    data.todoList.push(newTask);
    json = JSON.stringify(data, null, 2);
    fs.writeFileSync('./source/todo.json',json);
})

app.post('/remove',(req,res) => {
    const search = req.body.value;
    let json = fs.readFileSync('./source/todo.json');
    const data = JSON.parse(json);
    let list = data.todoList;

    for(let x of list){
        if(search == x.cosa){
            list.splice(list.indexOf(x),1);
            break;
        }
    }

    json = JSON.stringify(data, null, 2);
    fs.writeFileSync('./source/todo.json',json);
})

app.post('/move',(req,res) => {
    const search = req.body.value;
    let json = fs.readFileSync('./source/todo.json');
    const data = JSON.parse(json);
    let list = data.todoList;

    for(let x of list){
        if(search == x.cosa){
            if(x.stato == "todo"){
                x.stato = "done";
                break;
            }
            x.stato = "todo";
            break;
        }
    }
    json = JSON.stringify(data);
    fs.writeFileSync('./source/todo.json',json);
})

app.get('/*', (req,res) => {
    res.redirect('/');
});

app.listen(PORT,() => {console.log("Server su porta " + PORT)});