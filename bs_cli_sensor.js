var io = require("socket.io-client");

module.exports = function Sensor(sensor_address) {
    //this.isConnected = false;
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