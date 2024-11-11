const socket = io('ws://localhost:8008');

function addMessageHtml(content,id) {
    const ligne = document.createElement('li')
    const button = document.createElement('button')
    button.addEventListener('click',()=>{
        removeMessage(id).then(r => {
            if (r.message=='ok'){
                ligne.remove()
            }
        })
    })

    button.textContent= "delete"

    ligne.innerHTML = content;

    ligne.appendChild(button)
    document.querySelector('ul').appendChild(ligne);
}


socket.on('connectionValidation', () => {

    //get all message when we connect
    getMessages().then((data) => {

        //empty content
        document.querySelector('ul').innerHTML = '';

        //add message saved
        for (let message in data) {
            addMessageHtml(data[message].content,data[message]._id)
        }

        //add last messages add
        socket.on('message', (data) => {
            console.log(data,"data received")
            addMessageHtml(data.content,data.id)
        })


    })
    document.querySelector('button').addEventListener('click', () => {
        let messageToSend = document.querySelector('input').value

        console.log(messageToSend)

        sendMessage(messageToSend).then((message) => {
            console.log( {content: messageToSend,
                id:message._id
            },'data send')
            socket.emit('message',
                {content: messageToSend,
                id:message._id
                })
        })


        document.querySelector('input').value = ""
    })
})

