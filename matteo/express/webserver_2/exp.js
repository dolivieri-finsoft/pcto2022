const express = require('express');
const app = express();


app.use(express.static("/home/finsoft/Scrivania/github/pcto2022/matteo/express/webserver_2"));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/pg1.html");

})



app.listen(2900, function(){
    console.log("In ascolto su porta 2900...");
    
})