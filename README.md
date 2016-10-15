# bitstream
IoT data stream, everything is data. 物联网数据流

## Dependency
[redis](http://redis.io)

## Usage
### Server
```
yarn
forever start -l forever.log -o out.log -e err.log bs_cli_server.js
```

### Client
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
