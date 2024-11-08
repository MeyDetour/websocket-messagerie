const { Router } = require('express');
const router = Router();
const {getMessages} = require('../controllers/messages');

router.get('/messages',getMessages);


module.exports =router