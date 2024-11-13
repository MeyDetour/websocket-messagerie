const mongoose = require("mongoose");
const Message = require('../models/Message');


async function getMessages(req, res) {
    let messages = await Message.find({}).select('content')
    return res.status(200).send(messages)

}

async function createMessage(req, res) {
    const {content} = req.body
    console.log("data here :" + content)
    if (mongoose.connection.readyState !== 1) {
        console.log('La connexion à MongoDB n\'est pas établie');
        return res.status(500).send({message: 'La connexion à la base de données n\'est pas établie'});
    }

    try {
         const message = await Message.create({content});
        return res.status(201).send(message);
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: err.message});
    }


}

async function removeMessage(req, res) {
    try {
        const {id} = req.params;
        await Message.deleteOne({_id: id})

        return res.status(200).json({message:"ok"});
    } catch (err) {
        return res.status(500).send({message: err.message});

    }
}

module.exports = {getMessages, createMessage, removeMessage}