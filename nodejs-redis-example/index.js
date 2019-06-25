var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1'); //creates a new client


// Event handler is executed when the client is connected to the redis instance
client.on('connect', function() {
    console.log('connected');
});

// sets the value AngularJS to the key framework
client.set('framework', 'AngularJS', function(err, reply) {
    console.log(reply);
});

// Retrieves the value for the key framework
client.get('framework', function(err, reply) {
    console.log(reply);
});

// Maps each technology to its framework
// First argument is the name of the key
// Subsequent arguments represent key-value pairs
client.hmset('frameworks', 'javascript', 'AngularJS', 'css', 'Bootstrap', 'node', 'Express');

client.hmset('breakfast', {
    food: 'scrambled eggs',
    beverage: 'coffee'
});

// Retrieves an object containing all key-value pairs for a key
client.hgetall('frameworks', function(err, object) {
    console.log(object);
});

// Retrieves an object containing all key-value pairs for a key
client.hgetall('breakfast', function(err, object) {
    console.log(object);
});
