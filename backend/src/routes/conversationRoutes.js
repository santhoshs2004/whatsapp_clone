const express = require('express');
const router = express.Router();
const {
  createConversation,
  getUserConversations,
  getConversation
} = require('../controllers/conversationController');

router.post('/', createConversation);
router.get('/:userId', getUserConversations);

module.exports = router;
