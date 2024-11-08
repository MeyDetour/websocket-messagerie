const http = require('http')
const socket = require('socket.io')
const port = 8080

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end("server socket.io fonctionne")

})
const io = socket(server, {
    transports: ['websocket', 'polling'],
    cors: {
        origine: "https://chat-client.md-genos.com",
        methods: ['GET', 'POST']
    }
})
io.on('connect', (socket) => {
    socket.on('message', (data) => {

        try {
            io.emit('message', {
                author: socket.id,
                content: data.content,
            });
        } catch (e) {
            console.log(e);
        } finally {
            console.log(io.sockets.sockets.size);
        }
    })


})

server.listen(port, () => {
    console.log('Listening on port 8080')
})