// with ES6 import
const io = require( 'socket.io-client');
 
const socket = io('http://192.168.1.92:5000');
socket.emit('app_trigger_face_id', {'message': 'test'});
