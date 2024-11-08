const url = "http://localhost:3000";

async function getMessages() {
    try {
        const response = await fetch(url + '/messages');
        if (!response.ok) {
            throw new Error('Erreur HTTP : ' + response.status);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des messages :', error);
    }
}