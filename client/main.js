const socket = io('ws://localhost:8008');
let messagerie = document.querySelector('.messagerie');
let loginForm = document.querySelector('.loginform');
let registerForm = document.querySelector('.registerform');

let userObject= null;

function renderMessagerie() {
    if (userObject != null) {
        hideAll()
        messagerie.style.display = 'block';
        getMessages().then((data) => {
            console.log(data)
            //empty content
            messagerie.querySelector('ul').innerHTML = '';

            //add message saved
            for (let message of data) {
                console.log(message)
                if(message.userObject.name!= null){
                    addMessageHtml(message.content,  message._id,message.userObject.name);

                }
              }



        })
        document.querySelector('button').addEventListener('click', () => {
            let messageToSend = document.querySelector('input').value

            console.log(messageToSend)

            sendMessage(messageToSend,userObject.id).then((message) => {
                console.log({
                    content: messageToSend,
                    id: message._id,
                    userObject : userObject
                }, 'data send')
                socket.emit('message',
                    {
                        content: messageToSend,
                        id: message._id,
                        userObject : userObject
                    })
            })


            document.querySelector('input').value = ""
        })
    }
}

function addMessageHtml(content, id,name) {
    if(userObject !== null) {
        const ligne = document.createElement('li')
        const button = document.createElement('button')
        button.addEventListener('click', () => {
            removeMessage(id).then(r => {
                if (r.message == 'ok') {
                    ligne.remove()
                }
            })
        })


        button.textContent = "delete"

        ligne.innerHTML = name+" : "+content;

        ligne.appendChild(button)
        messagerie.querySelector('ul').appendChild(ligne);
    }

}

function hideAll() {
    loginForm.style.display = 'none';
    messagerie.style.display = 'none';
    registerForm.style.display = 'none';
}

document.querySelector('.toRegisterForm ').addEventListener('click', () => {
    hideAll();
    registerForm.style.display = 'block';
});
document.querySelector('.toLoginForm ').addEventListener('click', () => {
    hideAll();
    loginForm.style.display = 'block';
});
document.querySelector('.disconnect ').addEventListener('click', () => {
    hideAll();
    loginForm.style.display = 'block';
});

socket.on('connectionValidation', () => {
    hideAll();
    loginForm.style.display = 'block';

    //add last messages add
    socket.on('message', (data) => {
        console.log(data, "data received")
        addMessageHtml(data.content, data.id,data.userObject['name'])
    })


    document.querySelector('.loginform button').addEventListener('click', () => {
        username = document.querySelector('.loginform input[name="username"]').value
        if (username.trim().length > 0) {
            login(document.querySelector('.loginform input[name="username"]').value).then(res => {

                if (res.userObject != null) {
                    userObject = res.userObject;
                    renderMessagerie()
                }
            })
        }

    })
    document.querySelector('.registerform button').addEventListener('click', () => {
        username = document.querySelector('.registerform input[name="username"]').value

        if (username.trim().length > 0) {
            register(username).then(res => {
                console.log(res)
                if (res.userObject != null) {
                    userObject = res.userObject;
                    renderMessagerie()
                }
            })
        }
    })

renderMessagerie();
})

