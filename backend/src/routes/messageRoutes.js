const express = require('express');
const router = express.Router();
const {
  sendMessage,
  getMessages,
  markAsRead
} = require('../controllers/messageController');

router.post('/', sendMessage);
router.get('/:conversationId', getMessages);
router.put('/read/:conversationId/:userId', markAsRead);

module.exports = router;
