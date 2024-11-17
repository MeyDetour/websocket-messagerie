const socket = io('ws://localhost:8008');





socket.on('connectionValidation', () => {
    hideAll();
    loginForm.style.display = 'block';

    //add last messages add
    socket.on('message', (data) => {
        console.log(data.content, data.id, data.userObject['name'], "data received")
        messagerie.querySelector('.messagerie ul').innerHTML += messageTemplate(data.content, data.id, data.userObject['id'], data.userObject['name'])
    })



    messagerieController();
})

