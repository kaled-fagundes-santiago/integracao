const express = require('express');
const messageController = require('../controllers/messageController');


const router = express.Router();

router.post('/message', messageController.sendMessage);
router.post('/message/worker', messageController.processMessages);
router.get('/message', messageController.getMessages);

module.exports = router;
