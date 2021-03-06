const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/user');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));  // use a middleware

io.on('connection',(socket)=>{
    console.log('New user connected');

    socket.on('join', (params, callback)=>{
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required.')
        } 
        

        socket.join(params.room);
        users.removeUser(socket.id); //remove user from previous room
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        // socket.leave('The office Fans');

        //io.emit -> to all user ->io.to('The Office Fans').emit
        //socket.broadcast.emit -> to all users except me -> socket.broadcast.to('The Office Fans').emit
        //socket.emit -> specific to one user 

        socket.emit('newMessage', generateMessage('Admin', 'Welcom to the chat app')); 
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin', `${params.name} has joined`));
        callback();
    });

    socket.on('createMessage',(message, callback)=>{
        var user = users.getUser(socket.id);

        if(user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        // emit to every one who is connected
        
        callback(); //For client acknowledge receiving the message
    });

    socket.on('createLocationMessage', (coords)=>{
        var user = users.getUser(socket.id);

        if(user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude, coords.longitude));
        }
    });

    // socket.on('createLocationMessage', (coords)=>{
    //     io.emit('newMessage', generateMessage('Admin',`${coords.latitude}, ${coords.longitude}`));
    // });

    socket.on('disconnect',()=>{
        var user = users.removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });
});

server.listen(port, ()=>{
    console.log(`Server is up on ${port}`);
});