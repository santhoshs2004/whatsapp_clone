const User = require('../models/User');
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

// Map userId -> socketId
const onlineUsers = new Map();

const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`🔌 Socket connected: ${socket.id}`);

    // User comes online
    socket.on('setup', async (userId) => {
      socket.join(userId);
      onlineUsers.set(userId, socket.id);
      try {
        await User.findByIdAndUpdate(userId, { isOnline: true, lastSeen: new Date() });
      } catch (err) {
        console.error('Error setting user online:', err);
      }
      io.emit('user-status-change', { userId, isOnline: true });
      // Send current online users list to the connected user
      const onlineIds = Array.from(onlineUsers.keys());
      socket.emit('online-users', onlineIds);
    });

    // Join a conversation room
    socket.on('join_conversation', (conversationId) => {
      socket.join(conversationId);
    });

    // Leave a conversation room
    socket.on('leave-conversation', (conversationId) => {
      socket.leave(conversationId);
    });

    // Send message
    socket.on('send-message', async (data) => {
      const { conversationId, sender, text, receiverId } = data;

      try {
        // Save message to DB
        let message = await Message.create({
          conversation: conversationId,
          sender,
          receiver: receiverId,
          text,
          readBy: [sender]
        });

        // Update conversation
        await Conversation.findByIdAndUpdate(conversationId, {
          lastMessage: message._id,
          updatedAt: new Date()
        });

        message = await message.populate('sender', 'username avatarColor');

        // Emit to conversation room
        io.to(conversationId).emit('new-message', message);

        // Notify receiver about conversation update (for sidebar)
        const receiverSocketId = onlineUsers.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('conversation-updated', {
            conversationId,
            lastMessage: message
          });
        }
      } catch (err) {
        console.error('Error sending message:', err);
        socket.emit('message-error', { error: 'Failed to send message' });
      }
    });

    // Typing indicators
    socket.on('typing', ({ conversationId, userId, username }) => {
      socket.to(conversationId).emit('user-typing', { userId, username });
    });

    socket.on('stop-typing', ({ conversationId, userId }) => {
      socket.to(conversationId).emit('user-stop-typing', { userId });
    });

    // Mark messages as read
    socket.on('mark-read', async ({ conversationId, userId }) => {
      try {
        await Message.updateMany(
          { conversation: conversationId, readBy: { $ne: userId } },
          { $addToSet: { readBy: userId } }
        );
        socket.to(conversationId).emit('messages-read', { conversationId, userId });
      } catch (err) {
        console.error('Error marking messages read:', err);
      }
    });

    // Disconnect
    socket.on('disconnect', async () => {
      let disconnectedUserId = null;
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          disconnectedUserId = userId;
          onlineUsers.delete(userId);
          break;
        }
      }

      if (disconnectedUserId) {
        try {
          await User.findByIdAndUpdate(disconnectedUserId, {
            isOnline: false,
            lastSeen: new Date()
          });
        } catch (err) {
          console.error('Error setting user offline:', err);
        }
        io.emit('user-status-change', { userId: disconnectedUserId, isOnline: false });
      }
      console.log(`🔌 Socket disconnected: ${socket.id}`);
    });
  });
};

module.exports = { setupSocket, onlineUsers };
