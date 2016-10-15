var client_config = require('./client-config.js');
var io = require("socket.io-client");

var socket = io.connect('http://'+client_config.host+':'+client_config.port, {'forceNew': true});

function test() {
    var time = Date.now();
    console.log('Test start.');
    socket.emit('OPERATION', 'GET_RT', 'appkey', time);
}

socket.on('connect', function() {
    var id = '';
    console.log('Server Connecting!');
    socket.emit('authenticate', {token: client_config.appkey});

    socket.on('AUTH_SUCCESS', function(socket_id){
        console.log('Auth success, Received data:', socket_id);
        id = socket_id['socket_id'];

        socket.on('DATA', function (data) {
            console.log('Get data from POSTed data:', data);
        });

        test();
    });


    socket.on('disconnect', function() {
        console.log(id, ' disconnect...');
        socket.disconnect('disconnect');
    })

});
