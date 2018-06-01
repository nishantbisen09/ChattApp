var socket = io();

socket.on('connect',function (){
console.log('connected to server');





});

socket.on('disconnect',function (){
console.log('disconnected from server');
});


socket.on('newMessage',function(message){
  console.log('You have a new message',message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}:${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('welcome',function(greeting){
  console.log('You have a message',greeting);
});

socket.on('newUserJoined',function(adminMessage){
  console.log('Message from admin:',adminMessage);
})

// socket.emit('createMessage',{
//   from:'Nishant',
//   text:'Hiiiii'
// },function(data){
//   console.log('Got it..',data);
// });

jQuery('#message-form').on('submit',function(e) {
  e.preventDefault();

  socket.emit('createMessage',{
    from:'Nishant',
    text: jQuery('[name=message]').val()
  },function() {

  });

});
