const url = "http://localhost:4000";
async function removeMessage(id) {
    try {
        const response = await fetch(url + `/message/${id}/remove`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response )
        if (!response.ok) {
            throw new Error('Erreur HTTP : ' + response.status);
        }
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error(error)
    }
}
async function getMessages() {
    try {
        const response = await fetch(url + '/messages');
        if (!response.ok) {
            throw new Error('Erreur HTTP : ' + response.status);
        }
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error(error)
    }
}
async function sendMessage(message) {
    console.log("Create message")
    console.log(JSON.stringify({'content':message}))
    try {
        const response = await fetch(url + '/message/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'content':message})
        });
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