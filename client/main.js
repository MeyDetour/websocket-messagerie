const socket = io('ws://localhost:8008');


socket.on('connect', () => {
    console.log('connected')
    getMessages().then(messages => {
        socket.on('message', (data) => {
            const ligne = document.createElement('li')

            ligne.innerHTML = data.content;
            document.querySelector('ul').appendChild(ligne);
        })


        document.querySelector('button').addEventListener('click', () => {
            let messageToSend = document.querySelector('input').value

            console.log(messageToSend)

            sendMessage(messageToSend).then(() => {
                socket.emit('message',
                    { content: messageToSend } )
            })



            document.querySelector('input').value = ""
        })

    })

})

