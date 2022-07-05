const express =  require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/static'));
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));


app.listen(process.env.port || 8080);

console.log('Running at Port 8080');