var io = require("socket.io-client");
var Server = require('./bs_cli_server.js');
var client_config = require('./client-config.js');

var testServer = new Server(client_config.host, client_config.port, client_config.appkey).connect(function (socket) {
    testServer.getData(Date.now(), '86cfca41fac42f414c474a372bbe5acb'); // data source id
    socket.on('DATA', function (data) {
        console.log('Get data from data stream:', data);
    });
});
