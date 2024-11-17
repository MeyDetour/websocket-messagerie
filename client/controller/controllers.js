
//user connected with id and name
let userObject = null;


const tryTosendMessage = () => {
    let messageToSend = document.querySelector('.messagerie input').value
    //save in data base and then render locally
    sendMessage(messageToSend, userObject.id).then((message) => {
        socket.emit('message',
            {
                content: messageToSend,
                id: message._id,
                userObject: userObject
            })
    })
    //empty input texte
    document.querySelector('.messagerie').value = ""
}


function messagerieController() {

    if (userObject != null) {
        renderMessagerie()

        getMessages().then((data) => {
            // to empty content before regenerate
            messagerie.querySelector('ul').innerHTML = '';

            //add message
            for (let message of data) {
                if (message.userObject.name != null) {
  messagerie.querySelector('.messagerie ul').innerHTML += messageTemplate(message.content, message.id, message.userObject.id,message.userObject.name);
                }
            }

        })

    }
}



function tryToRemoveMessage(id){
    removeMessage(id).then(r => {
        if (r.message == 'ok') {
            const element = document.querySelector(`[data-id='${id}']`);
            if (element) {
                console.log(element);
                element.remove();
            } else {
                console.warn('Element not found for id:', id);
            }   }
    })
}
const tryToLogin = () => {
    username = document.querySelector('.loginform input[name="username"]').value
    if (username.trim().length > 0) {
        login(document.querySelector('.loginform input[name="username"]').value).then(res => {
            if (res.userObject != null) {
                userObject = res.userObject;
                messagerieController()
            }
        })
    }
}
const tryToRegister = () => {
    username = document.querySelector('.registerform input[name="username"]').value

    if (username.trim().length > 0) {
        register(username).then(res => {
            if (res.userObject != null) {
                userObject = res.userObject;
                messagerieController()
            }
        })
    }
}


