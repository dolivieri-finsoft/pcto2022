const express = require('express');
const app = express();
const port = 2424;
const bp = require('body-parser');
app.use(bp.urlencoded({extended:true}));
app.use(bp.json());

const fs = require('fs');

app.use(express.static('./'));
app.get('/', function(req, res) {
  res.sendFile(__dirname + "/todo.html");
})

app.listen(port, () => {
  console.log("Listening on port "+ port)
})

app.post('/rewrite', function(req, res){
  var aux = JSON.stringify(req.body);
  fs.writeFile('todoList.json', aux, err =>{
      if(err) throw err;
  });
})