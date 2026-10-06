const express= require('express');
const { join } = require('node:path');
const http= require('http');
const {Server}= require('socket.io');
const cors = require('cors');
const app= express();//instance of express
app.use(cors());
const port= 3000;
const server= http.createServer(app);
//const io= new Server(server);
const io = new Server(server, {
    cors:{
        origin: "http://127.0.0.1:5501",
    }
    
});


// app.get('/', (req, res) => {
// res.sendFile(join(__dirname, 'index.html'));
// });
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('send_message_to_all_users',msg);
    });
    socket.on('typing', () => {
    socket.broadcast.emit('typing', 'Someone is typing...');
    });

    socket.on('stoptyping', () => {
    socket.broadcast.emit('stoptyping', 'Someone stopped typing...');
    });
});

server.listen(port, () => {
console.log(`Server is running on http://localhost:${port}`);
});