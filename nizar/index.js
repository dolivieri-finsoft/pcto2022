var http = require('http');

//create a server object:
http.createServer(function (req, res) {
  res.write("Prova iniziale HTTP"); 
  res.end(); 
}).listen(8080); 



