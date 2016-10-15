# bitstream
IoT data stream, everything is data. 物联网数据流

## Dependency
[redis](http://redis.io)

## Usage
### Server
```
yarn
npm install forever -g
redis-server ./redis.conf
forever start -l forever.log -o out.log -e err.log server.js
```

### Client (For Quick Test)
```
node client_data_getter.js &
node client_data_sender.js
```

### Client (Programming)
```
var io = require("socket.io-client");
var Server = require('./bs_cli_server.js');
var client_config = require('./client-config.js');

var testServer = new Server(client_config.host, client_config.port, client_config.appkey).connect(function (socket) {
	testServer.getData(Date.now(), '86cfca41fac42f414c474a372bbe5acb'); // data id md5
	socket.on('DATA', function (data) {
		console.log('Get data from data stream:', data);
	});
});
```
