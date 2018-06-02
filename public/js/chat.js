var socket = io();

function scrollToBottom() {
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();
  if (scrollTop + clientHeight + newMessageHeight + lastMessageHeight >= scrollHeight) {
      messages.scrollTop(scrollHeight);
  }
}

socket.on('connect',function (){
console.log('connected to server');





});

socket.on('disconnect',function (){
console.log('disconnected from server');
});

socket.on('newLocationMessage',function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template,{
    from:message.from,
    createdAt:formattedTime,
    url:message.url
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});


socket.on('newMessage',function(message){
  console.log('You have a new message',message);
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,{
    message:message.text,
    from:message.from,
    createdAt:formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();
  // var formattedTime = moment(message.createdAt).format('h:mm a');
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}:${message.text}`);
  // jQuery('#messages').append(li);
});

socket.on('newMessage',function(greeting){
  console.log('You have a message',greeting);
});

socket.on('newUserJoined',function(adminMessage){
  console.log('Message from admin:',adminMessage);
});

// socket.emit('createMessage',{
//   from:'Nishant',
//   text:'Hiiiii'
// },function(data){
//   console.log('Got it..',data);
// });

jQuery('#message-form').on('submit',function(e) {
  e.preventDefault();
  var messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage',{
    from:'Nishant',
    text: messageTextbox.val()
  },function() {
    messageTextbox.val('');
  });

});

var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled','disabled').text('Sending location..');

  navigator.geolocation.getCurrentPosition(function(position){
    console.log(position);
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  },function(){
    locationButton.removeAttr('disabled').text('Send location');
    alert('unable to fetch location');
  })

});
