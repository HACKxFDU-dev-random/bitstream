var clients = {};
var idOfOnBroadcastingData = [];

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require('ioredis');
var md5 = require('md5');
var forEach = require('async-foreach').forEach;
var async = require('async');
var SyncPromise = require('sync-promise');
var server_config = require('./server-config.js');

var db = redis.createClient(server_config.redis_port, server_config.redis_host, {enable_offline_queue:false});
var db_multi = db.multi();
var _ = require('underscore');

/*
 *  未来
 *  当一个用户想要post数据的时候, 他首先从client通过socket发送POST_RT事件到server,
 *  server将这个用户想要post的数据的id加入到idOfOnBroadcastingData这个list中,
 *  然后node在后台有一个函数自动分发数据,然而这个想法极坑
 */

/*
 *  两种Redis list
 *  list 1 : listeners list for 1 data:
 *      每个data都会有自己的listener list
 *  list 2 : listening data list:
 *
 */


app.get('/',function(req,res){
    //code...
    res.send('Coming soon...');
});

db.on('connect', function () {
    console.log('Redis Database Connected.');
});

io.on("connection",function(socket){
    // Display a connected message
    socket.auth = true;
    _.each(io.nsps, function(nsp){
        nsp.on('connect', function(socket){
            if (!socket.auth) {
                console.log("removing socket from", nsp.name);
                //delete nsp.connected[socket.id]; 用之前应该check是否有这个元素
            }
        });
    });

    socket.on('authenticate', function(data){
        //check the auth data sent by the client
        checkAuth(data.token, function(err, success){
            if (!err && success){
                console.log("Authenticated socket", socket.id, 'with token', data.token);
                socket.emit('AUTH_SUCCESS', {socket_id: socket.id});
                socket.auth = true;
                //db.set(socket.id, socket);
                clients[socket.id] = socket.id;
                console.log('Added socket (%s) to clients list.', clients[socket.id]);
                _.each(io.nsps, function(nsp) {
                    if(_.findWhere(nsp.sockets, {id: socket.id})) {
                        console.log("Restoring socket to", nsp.name);
                        nsp.connected[socket.id] = socket;
                    }
                });
            }
        });
    });

    socket.on('OPERATION', function(operand, appkey, data){
        checkOperationAuth(appkey, operand, data, socket.auth, function(err, success){
            if(!err && success) {
                console.log('Operation with operand ', operand);
                var data_id = md5(appkey + 'DATA_ID');// 此处应有DATA_ID生成算法
                switch (operand) {
                    case 'POST_RT':
                        // 开启一个频道
                        console.log('A Client is POSTing data with socket_id', socket.id);
                        console.log('Operand:', operand, "Data:", data);

                        async.waterfall([
                            function(callback) {
                                //console.log('Server GOT data successfully. Now broadcasting...');
                                //console.log('Pushing data with data_id: ', 'Realdata'+data_id);

                                db.lrange(data_id, 0, -1, function (error, listeners) {
                                    callback(null, error, listeners, data);
                                });

                            },
                            function(error, listeners, data, callback) {

                                var timestamp = Date.now();
                                //idOfOnBroadcastingData.push(data_id);
                                // 我觉得用户有必要知道服务器发送这个数据的时间戳, 但是也可以不要
                                // 这有问题, 记得测试对特定用户的广播
                                console.log('Listener list for data: %s', data_id, ':', data);
                                //console.log(listeners);
                                forEach(listeners, function(listener, index, arr) {
                                    console.log('Send data to listener:', listener);
                                    socket.broadcast.to(listener).emit('DATA', {data:data, timestamp:timestamp});
                                });
                            }
                        ]);


                        break;
                    case 'GET_RT':
                        console.log('GETing data');
                        data_id = md5(appkey + 'DATA_ID'); // 此处应有DATA_ID生成算法

                        db.lpush(data_id, socket.id);
                        db.lpush(socket.id, data_id);
                        // 每一组都有一个listener list
                        break;
                    default:
                }
            } if (err) {

            }
        })
    });




    setTimeout(function(){
        //If the socket didn't authenticate, disconnect it
        if (!socket.auth) {
            console.log("Disconnecting socket ", socket.id);
            socket.disconnect('unauthorized');
        }
    }, 1000);


    socket.on("message",function(data){
        // We need to just forward this message to our other guy
        // We are literally just forwarding the whole data packet
        console.log(data);
    });



    socket.on("disconnect",function(data){
        // We need to notify Server 2 that the client has disconnected
        //var data_id = md5(appkey + 'DATA_ID');
        console.log(data);
        socket.disconnect('disconnect');
        delete clients[socket.id];

        db_multi.del(socket.id);
    });
});

function checkAuth(token, block) {
    // 在这里check token是否正确
    console.log('Checking auth...');
    block(false, true);
    return true;
}

function checkOperationAuth(appkey, operand, data, auth, block) {
    console.log('Checking operation auth...');
    block(false, auth);
    return true;
}

http.listen(server_config.port, function () {
    console.log('listening on *:', server_config.port);
});
