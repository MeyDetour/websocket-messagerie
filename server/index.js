const http = require('http');
const socketIo = require('socket.io');
const express = require('express');
const cors = require('cors');
const app = express();
const messageRoutes = require('./routes/message');
const mongoose = require('moongoose')
const mongodUri = 'mongodb://localhost:27017/messagerieExpress';


mongoose.connect(mongodUri)
    .then(() => {
        console.log('connected')
    }).catch((err) => {
        console.log(err)
})


app.use(cors())
app.use('/', messageRoutes)


const server = http.createServer((req, res) => {

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('serveur socket.io en fonctionnement');

})
const io = socketIo(server, {

    transports: ['websocket', 'polling'],
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }

});


io.on('connection', (socket) => {

    socket.emit('connected', 'Welcome!')
    socket.on('message', (message) => {
        console.log('Received message from ' + socket.id);
        console.log(message.content);

        try {
            io.emit('message', {
                author: socket.id,
                content: message.content,
            });
        } catch (e) {
            console.log(e);
        } finally {
            console.log('Broadcasted message to all clients');
            console.log(io.sockets.sockets.size);
        }
    })

})

server.listen(8008, () => {
    console.log('Server listening on port 8008');
});
app.listen(3000, () => {
    console.log('App listening on port 3000');
});