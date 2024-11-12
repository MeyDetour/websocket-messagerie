const http = require('http');
const socketIo = require('socket.io');
const express = require('express');
const cors = require('cors');
const app = express();

//routes
const messageRoutes = require('./routes/message');
const userRoutes = require('./routes/user');

//mongodb
const connectToDatabase = require("./mongoose");

//postgresql




app.use(express.json());
app.use(cors())


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
connectToDatabase().then(() => {
    app.use('/', messageRoutes)
    app.use('/', userRoutes)

    server.listen(8008, () => {
        console.log('Server listening on port 8008');
    });
    app.listen(4000, () => {
        console.log('App listening on port 4000');
    });

});


io.on('connection', (socket) => {

    console.log("connected to socket")
    //start to emit when connected to db
    socket.emit('connectionValidation', 'Welcome!')
    socket.on('message', (message) => {
        console.log('Received message from ' + socket.id);
        console.log(message.content);

        try {
            io.emit('message', {
                author: socket.id,
                content: message.content,
                id: message.id,
            });
        } catch (e) {
            console.log(e);
        } finally {
            console.log('Broadcasted message to all clients');
            console.log(io.sockets.sockets.size);
        }
    })


})

