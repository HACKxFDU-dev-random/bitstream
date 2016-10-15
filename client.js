var host = '127.0.0.1';
var port = 3000;
var io = require("socket.io-client");
var Sensor = require('./bs_cli_sensor.js');
var socket = io.connect('http://localhost:3000', {'forceNew': true});

/*need a configure file to save:
.py file name to start child process;
sensor address
*/
function test() {
    console.log('Test start.');
    var testSensor = new Sensor('test_address').connect();


    setInterval(function () {
        data = testSensor.data();
        console.log('Trying to posting data...:', data);
        socket.emit('OPERATION', 'POST_RT', 'appkey', data);
    }, 1000);

    // like a synced while(true).

}


socket.on('connect', function() {
    var id = '';
    var socket = io.connect('http://localhost:3000', {'forceNew': true});
    id  = socket.id;
    console.log('Server Connecting!');
    socket.emit('authenticate', {token: 'appkeyappsecret'});

    socket.on('AUTH_SUCCESS', function(socket_id){
        console.log('Auth success, Received data:', socket_id);
        //socket.emit("message","This is my message");

        socket.on('message', function(data){
            console.log("We got a message: ",data);
        });
        //socket.emit('OPERATION', 'POST_RT', 'appkey', 128038809123);
        test();

    });


    socket.on('disconnect', function() {
        console.log(id, ' disconnect...');
        socket.disconnect('disconnect');
    })

});



