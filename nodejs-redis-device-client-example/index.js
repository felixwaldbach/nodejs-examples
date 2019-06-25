var redis = require("redis");
var nanoid = require("nanoid");
var token = null;

const UUID = nanoid();
const FRAME = 'frame' + Math.floor(Math.random() * 5) + 1;

const PORT = 6379;
const HOST = "redis-server";

var pub = redis.createClient(PORT, HOST);
var sub = redis.createClient(PORT, HOST);

pub.on('connect', function () {
    console.log("Pub Connected to Redis Server " + HOST + ":" + PORT);
    pub.publish('auth', JSON.stringify({
        'uuid': UUID,
        'text': 'Hello from edge device ' + UUID
    }));
});

sub.on('connect', function () {
    console.log("Sub Connected to Redis Server " + HOST + ":" + PORT);
    sub.subscribe(UUID + '_message_channel');
    sub.subscribe(FRAME);
    sub.subscribe('all');
    const timeoutFunction = function () {
        pub.publish('info', JSON.stringify({
            uuid: UUID,
            text: "This message is sent from " + UUID
        }));
        setTimeout(timeoutFunction, 10000)
    }
    timeoutFunction();
});


sub.on('message', function (channel, message) {
    switch (channel) {
        case UUID + '_message_channel':
            console.log('Personal message received: ' + message);
            switch(JSON.parse(message).type) {
                case 'auth':
                    console.log('Auth message from server');
                    token = JSON.parse(message).token;
                    pub.publish('info', JSON.stringify({
                        'uuid': UUID,
                        'text': 'Device information request from edge device ' + UUID
                    }));
                    // Process Configuration
                    break;
                case 'info':
                    console.log('Info message from server');
                    // Add information about device, e.g. OS, ...
                    // Save information locally
                    // send sync message with new information to server
                    // process configuration
                    break;
                case 'text':
                    console.log('Text message from server');
                    // Print received text
                    break;
                case 'command':
                    console.log('Command message from server');
                    // Handle command from server
                    break;
            }
            break;
        case FRAME:
            console.log('Frame message received: ' + message);
            break;
        case 'all':
            console.log('Message for everyone received: ' + message);
            break;
        default:
            console.log('Unknown message: ' + message);
            break;
    }
});