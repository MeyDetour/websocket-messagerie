const socket = io('http://localhost:8080');


socket.on('message', (data) => {
    const ligne = document.createElement('li')

    ligne.innerHTML = data.content;
    document.querySelector('ul').appendChild(ligne);
})


document.querySelector('button').addEventListener('click', () => {
    let messageToSend = document.querySelector('input').value

    console.log(messageToSend)
    socket.emit('message',
        { content: messageToSend } )
    document.querySelector('input').value = ""
})