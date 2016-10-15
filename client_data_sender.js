var host = '127.0.0.1';
var port = 3000;
var io = require("socket.io-client");
var Server = require('./bs_cli_server.js');
var Sensor = require('./bs_cli_sensor.js');
var testSensor = new Sensor();
var thisServer = new Server('127.0.0.1', 3000, 'appkeyappsecret').connect(function (socket) {
    setInterval(function () {
        data = testSensor.data();
        console.log('Trying to posting data...:', data);
        thisServer.postData(data);
    }, 1000);
});
