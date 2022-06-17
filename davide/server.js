var express = require('express'),
    app = express();
const path = require('path');

app.use(express.static("public"));

app.get('/',function (req,res) {
        res.sendfile(path.join(__dirname, '/public/index.html'));
        })
.listen(8080);

console.log("Server hostato su http://localhost:8080");