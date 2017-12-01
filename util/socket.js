var BoxModel = require('../models/BoxModel');

var io = null;
module.exports = {
    init: function(server) {
        io = require('socket.io')(server); // myNote: will listen on the server
        io.on('connection', function(socket){
            console.log('a user connected');

            socket.on("on_connect", function(id){
                console.log("User joined room: " + id);
                socket.join(id);
            });

            socket.on('disconnect', function(){
                console.log('user disconnected');
              });

            //sent_chat_msg 'data' is {room_id:self+selectedID, msg: "some message"} where room_id sorted by alphabetical
            socket.on('draw_add', function(data){
                var newData = new BoxModel({
                    room_id: data.id,
                    coordinate: data.coordinate.row + " " + data.coordinate.col,
                    color: "black"
                });
                newData.save(function(){
                    console.log("Saved")
                });
                

                socket.broadcast.to(data.id).emit('recv_draw', data);
            });

            socket.on('draw_remove', function(data){
                var coordinate = data.coordinate.row + " " + data.coordinate.col;
                console.log(data);
                BoxModel.remove({
                    coordinate: coordinate
                }, function(){
                    console.log("Revmoed");
                    socket.broadcast.to(data.id).emit('recv_draw', data);
                })
                
            });
        });
        
    },
    instance: function() {
        return io;
    }
}