import { useEffect, useCallback } from 'react';
import Navbar from './Navbar';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { useChat } from '../context/ChatContext';
import { sendMessage } from '../api/messageApi';
import toast from 'react-hot-toast';

const ChatWindow = () => {
  const { user } = useAuth();
  const { socket } = useSocket();
  const {
    activeConversation,
    addMessage,
    updateConversationLastMessage,
    loadConversations
  } = useChat();

  // Join conversation room on mount / when active changes
  useEffect(() => {
    if (!socket || !activeConversation) return;

    socket.emit('join_conversation', activeConversation._id);

    return () => {
      socket.emit('leave-conversation', activeConversation._id);
    };
  }, [socket, activeConversation]);

  // Listen for new messages in this conversation
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      addMessage(message);
      updateConversationLastMessage(activeConversation._id, {
        text: message.text,
        sender: message.sender._id || message.sender,
        createdAt: message.createdAt
      });
    };

    socket.on('new_message', handleNewMessage);

    return () => {
      socket.off('new_message', handleNewMessage);
    };
  }, [socket, activeConversation, addMessage, updateConversationLastMessage]);

  // Mark messages as read when entering conversation
  useEffect(() => {
    if (!socket || !activeConversation || !user) return;
    socket.emit('mark-read', {
      conversationId: activeConversation._id,
      userId: user._id
    });
  }, [socket, activeConversation, user]);

  const handleSendMessage = useCallback(async (text) => {
    if (!activeConversation || !user) return;

    const otherUser = activeConversation.participants.find(
      (p) => p._id !== user._id
    );

    try {
      await sendMessage({
        conversationId: activeConversation._id,
        senderId: user._id,
        receiverId: otherUser?._id,
        text
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message. Please try again.');
    }
  }, [activeConversation, user]);

  return (
    <div className="flex-1 flex flex-col h-full">
      <Navbar />
      <MessageList />
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
