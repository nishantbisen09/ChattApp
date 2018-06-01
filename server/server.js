const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

var app = express();


const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var server = http.createServer(app); //configuring express with http to use socket.io
var io =socketIO(server);

io.on('connection',(socket)=>{
  console.log('new user connected');

  socket.emit('welcome',{
    from:'Admin',
    text:'Welcome to chat app'
  });

  socket.broadcast.emit('newUserJoined',{
    from:'Admin',
    text:'New user joined'
  })


socket.on('createMessage',(msgBody)=>{
  console.log('Message Body:',msgBody);
  io.emit('newMessage',{
    from: msgBody.from,
    text: msgBody.text,
    completedAt: new Date().getTime()
  });
});


socket.on('disconnect',()=>{
  console.log('user was disconnected');
});
});

app.use(express.static(publicPath));

server.listen(port,()=>{
  console.log(`server up on port ${port}`);
})
