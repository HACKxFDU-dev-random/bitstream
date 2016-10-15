var host = '127.0.0.1';
var port = 3000;
var io = require("socket.io-client");
var Server = require('./bs_cli_server.js');

var testServer = new Server('127.0.0.1', 3000, 'appkeyappsecret').connect(function (socket) {
    testServer.getData(Date.now(), '86cfca41fac42f414c474a372bbe5acb');
    socket.on('DATA', function (data) {
        console.log('Get data from POSTed data:', data);
    });
});

