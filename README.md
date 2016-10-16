# bitstream
IoT data stream, everything is data. 物联网数据流

## Dependency
[redis](http://redis.io)
[node.js](https://nodejs.org)
[yarn](https://yarnpkg.com)

## Usage
### Server
```
$ yarn
$ yarn global add forever
$ redis-server ./redis.conf
$ # You may edit ```server-config.js``` before forever runs
$ forever start -a -l forever.log -o out.log -e err.log server.js
```

### Client (For Quick Test)
```
$ node client_data_getter.js &
$ node client_data_sender.js
```

If everything is fine, 
![screenshot-1](https://raw.githubusercontent.com/HACKxFDU-dev-random/bitstream/master/screenshot-1.png)

### Client (Programming)
```
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
```

### Client Sender (A temperature sensor for example)
```
var io = require("socket.io-client");

module.exports = function Sensor(sensor_address) {
	var date = Date.now();
	this.connect = function () {
		this.isConnected = true;
		return this;
	};

	this.disconnect = function () {
		this.isConnected = false;
	};

	this.data = function () {
		date = Date.now();
		// generate temperature data
		return {"temperature": Math.random() % 0.3 + 25, "time": date};
	};
};
```
