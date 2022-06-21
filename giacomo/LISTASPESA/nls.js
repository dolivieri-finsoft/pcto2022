const { fstat}= require('fs');
const express = require('express');
const app = express();
const port = 8080;
const path = require('path');


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/home/td.html'));
})
app.get('/request', function (req, res) {
  const fs = require('fs');

  fs.readFile('./json/spesa.json', (err,jsonString) => {
  
    var trasformazione = JSON.parse(jsonString);
  
    res.send(trasformazione);
    })
  
  });
  app.get('/write', function(req,res){
  
    var data = fs.readFileSync("./json/spesa.json");
    var oggetto = JSON.parse(data);
      
    
    var newData = {
      "oggetto": `${req.query.oggetto}`,
      "stato": `${req.query.stato}`
    };
      
    oggetto.push(newData);
      
    var newData2 = JSON.stringify(oggetto);
    fs.writeFile("./json/spesa.json", newData2, (err) => {
     
      if (err) throw err;
      console.log("Aggiunto");
    });
    
    });
    
    app.get('/delete', function(req,res){
    
      var data = fs.readFileSync("./json/spesa.json");
      var oggetto = JSON.parse(data);
    
      for(var i = 0; i < oggetto.length; i++){
        if(oggetto[i].oggetto == req.query.oggetto){
          oggetto.splice(i, 1);
          break;
        }
      }
    
        fs.writeFile("./json/spesa.json", JSON.stringify(oggetto), (err) => {
          if (err) throw err;
          console.log("Eliminato: ✔");
        });
    });
    
    
    app.get('/cambia', function(req,res){
    
      var data = fs.readFileSync("./json/spesa.json");
      var oggetto = JSON.parse(data);
       
    
        for(var i = 0; i < oggetto.length; i++){
          if(oggetto[i].oggetto == req.query.oggetto){
          oggetto[i].stato = "done";
          break;
         }
       }
    
        fs.writeFile("./json/spesa.json", JSON.stringify(oggetto), (err) => {
          if (err) throw err;
          console.log("Spostato: ✔");
        });
    });
    
app.listen(port, () => {
  console.log('listening on port ' + port)
});

