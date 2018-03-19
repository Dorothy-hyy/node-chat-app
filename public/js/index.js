var socket = io();
socket.on('connect',function(){
    console.log('Connected to server');
});

socket.on('disconnect',function(){
    console.log('Disconnected from server');

    socket.emit('createMessage', {
        from: 'Dorothy',
        text: 'Yup, that works for me'
    })
});

socket.on('newMessage', function(message){
    console.log('newMessage', message);
});