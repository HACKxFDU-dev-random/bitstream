var client_config = require('./client-config.js');
var io = require("socket.io-client");
var Server = require('./bs_cli_server.js');

// Define your own sensor
var Sensor = require('./bs_cli_sensor.js');

var testSensor = new Sensor();
var thisServer = new Server(client_config.host, client_config.port, client_config.appkey).connect(function (socket) {
    setInterval(function () {
        data = testSensor.data();
        console.log('Trying to posting data...:', data);
        // Server accepts this data
        // and then wrap it
        //   {
        //      "data": HERE,
        //      "time": time 
        //   }
        thisServer.postData(data);
    }, 1000);
});
