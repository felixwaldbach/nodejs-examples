var redis = require("redis");
var jwt = require('jsonwebtoken');

const cassandra = require('cassandra-driver');
const PlainTextAuthProvider = cassandra.auth.PlainTextAuthProvider;
const cassandraClient = new cassandra.Client({
    contactPoints: ['cassandra-server'],
    authProvider: new PlainTextAuthProvider('cassandra', 'cassandra'),
    localDataCenter: 'datacenter1', keyspace: 'edgewood'
});

const PORT = 6379;
const HOST = "redis-server";

var redisSub = redis.createClient(PORT, HOST);
var redisPub = redis.createClient(PORT, HOST);

redisPub.on('connect', function () {
    console.log("Pub Connected to Redis Server " + HOST + ":" + PORT);
    redisPub.publish('all', JSON.stringify({
        'uuid': 'server',
        'text': 'Hello from server'
    }));
});

redisSub.on('connect', function () {
    console.log("Sub Connected to Redis Server " + HOST + ":" + PORT);
    redisSub.subscribe('auth');
    redisSub.subscribe('info');
    redisSub.subscribe('sync');
    redisSub.subscribe('logs');
});

redisSub.on("message", function (channel, message) {
    let query;
    switch (channel) {
        case 'auth':
            console.log('Authentication message from ' + JSON.parse(message).uuid);
            // check if uuid is in database
            query = "INSERT INTO edgewood.deviceLogs (device_uuid, text) \n" +
                "VALUES (" + JSON.parse(message).uuid + ", " + JSON.parse(message).text +")";
            cassandraClient.execute(query)
                .then(result => console.log(result));
            let token = jwt.sign({uuid: JSON.parse(message).uuid}, 'topSecret', {expiresIn: '48h'});
            // if so, create token and send it back
            redisPub.publish(JSON.parse(message).uuid + '_message_channel', JSON.stringify({
                uuid: 'server',
                type: 'auth',
                token: token,
                text: 'Authentication accepted'
            }));
            break;
        case 'info':
            query = "INSERT INTO edgewood.deviceInfo (device_uuid, text) \n" +
                "VALUES (" + JSON.parse(message).uuid + ", " + JSON.parse(message).text +")";
            cassandraClient.execute(query)
                .then(result => console.log(result));
            console.log('Info: ' + message);
            break;
        default:
            console.log(channel + ': ' + message);
            break;
    }
});