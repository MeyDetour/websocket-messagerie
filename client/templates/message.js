const messageTemplate = (content, id, name) => {
    return `
   <li data-id="${id}">
       <span>${name} : ${content}</span>
       <button onclick="tryToRemoveMessage('${id}')">delete</button>
   </li>
    `;
};


/*
function addMessageHtml(content, id, name) {

    if (userObject !== null) {
        const ligne = document.createElement('li')
        const button = document.createElement('button')
        //Delete in db and then delete locally
        button.addEventListener('click', () => {
            removeMessage(id).then(r => {
                if (r.message == 'ok') {
                    ligne.remove()
                }
            })
        })

        button.textContent = "delete"
        ligne.innerHTML = name + " : " + content;

        ligne.appendChild(button)
        messagerie.querySelector('ul').appendChild(ligne);
    }

}*/