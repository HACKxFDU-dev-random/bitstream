function Server(host, port, appkeyappsecret) {
    this.isConnected = false;

    this.connect = function (callback) {
        console.log('Connecting to server....');
        var socket = io.connect('http://'+host+':'+port, {'forceNew': true});
        this.isConnected = true;
        socket.emit('authenticate', {token: appkeyappsecret});
        this.postData = function (data) {
            socket.emit('OPERATION', 'POST_RT', 'appkey', data);
        };
        this.getData = function (data, DATA_ID) {
            socket.emit('OPERATION', 'GET_RT', 'appkey', data, DATA_ID);
        };

        socket.on('AUTH_SUCCESS', function (socket_id) {
            console.log('Auth success, Received data:', socket_id);
            id = socket_id['socket_id'];
            callback(socket);


            socket.on('connect', function () {
                var id = '';
                console.log('Server Connecting!');
                socket.emit('authenticate', {token: appkeyappsecret});

                //test();
            });


            socket.on('disconnect', function () {
                console.log(id, ' disconnect...');
                socket.disconnect('disconnect');
            })

        });

        return this;
    };
}
