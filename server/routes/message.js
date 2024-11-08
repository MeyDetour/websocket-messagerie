const {Router} = require('express');
const router = Router();
const {getMessages,createMessage} = require('../controllers/messages');

router.get('/messages', getMessages);
router.post('/new/message', createMessage);


module.exports = router