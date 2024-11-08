function getMessages(req, res) {
    let messages = ['messages']
    res.status(200).send(messages)

}
module.exports = {getMessages}