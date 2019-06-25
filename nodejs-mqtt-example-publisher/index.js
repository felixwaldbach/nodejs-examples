var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://192.168.1.92:1883');
//console.log(client)
client.on('connect', function () {
});
client.publish('indoor/pir/send/motion', '1');
