const http = require('http');
const socketIo = require('socket.io');
const express = require('express');
const cors = require('cors');
const app = express();
const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'websocket',
    password: 'HB6RIZ9w$cFAV6@$',
    port: 5432
});

console.log("ppol:",pool);


module.exports = pool;
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
let serverInitialized = false;
connectToDatabase().then(() => {
    console.log('connected to mongoose')
    pool.on('connect', client => {
        client.query('SET search_path TO persons;')
        console.log('connected to database postgres')

        app.use('/', messageRoutes)
        app.use('/', userRoutes)
if(!serverInitialized){
    server.listen(8008, () => {
        console.log('Server listening on port 8008');
    });
    app.listen(4000, () => {
        console.log('App listening on port 4000');
    });

    serverInitialized = true;
}

    });

});


io.on('connection', (socket) => {

    console.log("connected to socket")
    //start to emit when connected to db
    socket.emit('connectionValidation', 'Welcome!')
    socket.on('message', (message) => {
        console.log('Received message from ' + message.userObject.name);
        console.log(message.content);

        try {
            io.emit('message', {
                author: socket.id,
                userObject: message.userObject,
                content: message.content,
                id: message.id,
            });
        } catch (e) {
            console.log(e);
        } finally {
            console.log('Broadcasted message to all clients');

        }
    })


})
