var cors = require('cors');
var app = require('express')();
app.use(cors());

var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(bodyParser());

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/hello', function(req, res){
  console.log("Incoming hello message:");
  console.log(req.body.test);
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.send('test', 'test');
});

io.on('message', function(message){
  console.log("Message received");
  console.log(message);
});

http.listen(5000, function(){
  console.log('listening on *:5000');
});
