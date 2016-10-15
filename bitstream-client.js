var io = require("socket.io-client");

module.exports = function Sensor(sensor_address) {
    this.isConnected = false;
    var date = Date.now();
    this.connect = function (callback) {
        this.isConnected = true;
        callback();
        return this;
    };

    this.disconnect = function () {
        this.isConnected = false;
    };

    this.data = function () {
        if (Date.now() - date > 1000) {
            date = Date.now();
            // generate temperature data
            return Math.random() % 0.3 + 25;
        } else {
            return null;
        }

    };
};

module.exports = function Server(host, port, appkeyappsecret) {
    this.isConnected = false;

    this.connect = function (operand, data, DATA_ID, callback) {
        this.isConnected = true;

            socket.on('AUTH_SUCCESS', function(socket_id){
                console.log('Auth success, Received data:', socket_id);
                id = socket_id['socket_id'];

                socket.on('DATA', function (data) {
                    console.log('Get data from POSTed data:', data);
                    callback(data);
                });

                var getDataRequest = function(data, DATA_ID) {
                    socket.emit('OPERATION', 'GET_RT', 'appkey', data, DATA_ID);
                    //callback();
                    return ture;
                };

                var postData = function (data) {
                    socket.emit('OPERATION', 'POST_RT', 'appkey', data);
                };

                socket.on('connect', function() {
                    var id = '';
                    console.log('Server Connecting!');
                    socket.emit('authenticate', {token: appkeyappsecret});

                    switch (operand) {
                        case 'POST_RT':
                            postDataRequest(data);
                            break;
                        case 'GET_RT':
                            getData(data, DATA_ID);
                            break;
                        default:
                            break;
                    }


                    //test();
            });


            socket.on('disconnect', function() {
                console.log(id, ' disconnect...');
                socket.disconnect('disconnect');
            })

        });

        return this;
    };


};




function test() {
    console.log('Test start.');
    var testSensor = new Sensor('test_address').connect(function () {

    });

    function getData() {

        data = testSensor.data();
        if(data != null) {
            console.log('Processing sensor data...', data);
            socket.emit('OPERATION', 'POST_RT', 'appkey', data);
        }
    }setInterval(getData, 500);
    // like a synced while(true).
}


