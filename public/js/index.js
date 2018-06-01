var socket = io();

socket.on('connect',function (){
console.log('connected to server');





});

socket.on('disconnect',function (){
console.log('disconnected from server');
});


socket.on('newMessage',function(message){
  console.log('You have a new message',message);
});

socket.on('welcome',function(greeting){
  console.log('You have a message',greeting);
});

socket.on('newUserJoined',function(adminMessage){
  console.log('Message from admin:',adminMessage);
})
