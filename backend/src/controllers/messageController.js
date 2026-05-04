const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const { onlineUsers } = require('../socket/socketHandler');

// Send a message
exports.sendMessage = async (req, res) => {
  try {
    const { conversationId, senderId, receiverId, text } = req.body;

    if (!conversationId || !senderId || !receiverId || !text || text.trim() === '') {
      return res.status(400).json({ error: 'Missing required fields or empty message' });
    }

    let message = await Message.create({
      conversation: conversationId,
      sender: senderId,
      receiver: receiverId,
      text: text.trim(),
      readBy: [senderId]
    });

    // Update conversation's last message reference
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: message._id,
      updatedAt: new Date()
    });

    message = await message.populate('sender', 'username avatarColor');

    // Emit real-time message using Socket.IO
    req.io.to(receiverId).emit('receive_message', message);
    req.io.to(conversationId).emit('new_message', message);

    res.status(201).json(message);
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({ error: 'MongoDB Validation Error' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get messages for a conversation
exports.getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { page = 1, limit = 50 } = req.query;

    const messages = await Message.find({ conversation: conversationId })
      .populate('sender', 'username avatarColor')
      .sort({ createdAt: 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Message.countDocuments({ conversation: conversationId });

    res.json({
      messages,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark messages as read
exports.markAsRead = async (req, res) => {
  try {
    const { conversationId, userId } = req.params;

    await Message.updateMany(
      { conversation: conversationId, readBy: { $ne: userId } },
      { $addToSet: { readBy: userId } }
    );

    res.json({ message: 'Messages marked as read' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
