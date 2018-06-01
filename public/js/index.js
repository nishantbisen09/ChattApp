var socket = io();

socket.on('connect',function (){
console.log('connected to server');



socket.emit('createMessage',{
  from:'Nishant',
  text:'hello Nishant'
});


});

socket.on('disconnect',function (){
console.log('disconnected from server');
});


socket.on('newMessage',function(message){
  console.log('You have a new message',message);
});
