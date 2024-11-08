const Message = require('../models/message');


function getMessages(req, res) {
    let messages = ['messages']
    res.status(200).send(messages)

}

async function createMessage(req, res) {
    const {...data} = req.body
    await Message.create({...data})
        .then(message => {
            res.status(201).send({message})
        })
        .catch(err => {
            res.status(500).send({message: err.error.message})
        })

}

module.exports = {getMessages,createMessage}