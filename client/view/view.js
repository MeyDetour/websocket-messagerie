//front end container
let messagerie = document.querySelector('.messagerie');
let loginForm = document.querySelector('.loginform');
let registerForm = document.querySelector('.registerform');


function hideAll() {
    loginForm.style.display = 'none';
    messagerie.style.display = 'none';
    registerForm.style.display = 'none';
}

const renderRegisterForm = () => {
    hideAll();
    registerForm.style.display = 'block';
}


const renderLoginForm = () => {
    hideAll();
    loginForm.style.display = 'block';
}

const renderMessagerie = () => {
    hideAll();
    messagerie.style.display = 'block';
}


