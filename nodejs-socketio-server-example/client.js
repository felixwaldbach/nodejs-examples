const
    io = require("socket.io-client"),
    ioClient = io.connect("http://localhost:3000");

//ioClient.on("seq-num", (msg) => console.info(msg));
ioClient.on('connect', function(io) {
console.log('connected');
ioClient.emit('test', {
userId: "5ca4d5d7a76dea2288e66bd9",
news: 'Test message'
});
});
