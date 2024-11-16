const socket = io('ws://localhost:8008');


//user connected with id and name
let userObject = null;


function messagerieController() {

    //assert user connected
    if (userObject != null) {

        //================render
        renderMessagerie()

        getMessages().then((data) => {
            // to empty content before regenerate
            messagerie.querySelector('ul').innerHTML = '';

            //add message
            for (let message of data) {
                if (message.userObject.name != null) {


                    messagerie.querySelector('ul').innerHTML+= messageTemplate(message.content, message.id, message.userObject.name);
                }
            }

            /*    for (let message of data) {
                if (message.userObject.name != null) {
                  addMessageHtml(message.content, message.id, message.userObject.name);
                }
            }*/
        })
        //================

        //=================Send message click
        document.querySelector('button').addEventListener('click', () => {
            let messageToSend = document.querySelector('input').value
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
            document.querySelector('input').value = ""
        })
        //================
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



socket.on('connectionValidation', () => {
    hideAll();
    loginForm.style.display = 'block';

    //add last messages add
    socket.on('message', (data) => {
        console.log(data.content, data.id, data.userObject['name'], "data received")
        addMessageHtml(data.content, data.id, data.userObject['name'])
    })



    messagerieController();
})

