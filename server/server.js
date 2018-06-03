const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isString} = require('./utils/validation');
const {Users} = require('./utils/users');

var app = express();
var users = new Users();

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var server = http.createServer(app); //configuring express with http to use socket.io
var io =socketIO(server);

io.on('connection',(socket)=>{
  console.log('new user connected');

  socket.on('join',(params,callback)=>{
    if (!isString(params.name) || !isString(params.room)) {
      return callback('Valid name and room name required');
    }


    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id,params.name,params.room);
    console.log(users.getUserList(params.room));
    io.to(params.room).emit('updateUsers',users.getUserList(params.room));
    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));
    callback();
  });


socket.on('createMessage',(msgBody,callback)=>{
  console.log('Message Body:',msgBody);
  io.emit('newMessage',generateMessage(msgBody.from,msgBody.text));
  callback();
});

socket.on('createLocationMessage',(coords)=>{
  io.emit('newLocationMessage',generateLocationMessage('Admin',`${coords.latitude}`,`${coords.longitude}`));
});

socket.on('disconnect',() => {
  console.log('user was disconnected');
  var user = users.removeUser(socket.id);
  if (user) {
    io.to(user.room).emit('updateUsers',users.getUserList(user.room));
    io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`));
  }

});
});

app.use(express.static(publicPath));

server.listen(port,()=>{
  console.log(`server up on port ${port}`);
})
