const url = "http://localhost:3000";

async function getMessages() {
    try {
        const response = await fetch(url + '/messages');
        if (!response.ok) {
            throw new Error('Erreur HTTP : ' + response.status);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error)
    }
}
async function sendMessage(message) {
    try {
        const response = await fetch(url + '/messages',{body:JSON.stringify(message)},);
        if (!response.ok) {
            throw new Error('Erreur HTTP : ' + response.status);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}