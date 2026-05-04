import { createContext, useContext, useState, useCallback } from 'react';
import { getUserConversations, createConversation } from '../api/conversationApi';
import { getMessages as fetchMessages } from '../api/messageApi';
import { useAuth } from './AuthContext';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const loadConversations = useCallback(async () => {
    if (!user) return;
    setLoadingConversations(true);
    try {
      const { data } = await getUserConversations(user._id);
      setConversations(data);
    } catch (err) {
      console.error('Error loading conversations:', err);
    } finally {
      setLoadingConversations(false);
    }
  }, [user]);

  const startConversation = useCallback(async (receiverId) => {
    if (!user) return null;
    try {
      const { data } = await createConversation({
        senderId: user._id,
        receiverId
      });
      // Add to conversations if not already there
      setConversations((prev) => {
        const exists = prev.find((c) => c._id === data._id);
        if (exists) return prev;
        return [data, ...prev];
      });
      setActiveConversation(data);
      return data;
    } catch (err) {
      console.error('Error starting conversation:', err);
      return null;
    }
  }, [user]);

  const loadMessages = useCallback(async (conversationId) => {
    setLoadingMessages(true);
    try {
      const { data } = await fetchMessages(conversationId);
      setMessages(data.messages);
    } catch (err) {
      console.error('Error loading messages:', err);
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  const addMessage = useCallback((message) => {
    setMessages((prev) => {
      // Avoid duplicate
      if (prev.find((m) => m._id === message._id)) return prev;
      return [...prev, message];
    });
  }, []);

  const updateConversationLastMessage = useCallback((conversationId, lastMessage) => {
    setConversations((prev) => {
      const updated = prev.map((c) =>
        c._id === conversationId
          ? { ...c, lastMessage, updatedAt: new Date().toISOString() }
          : c
      );
      // Sort by most recent
      return updated.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    });
  }, []);

  const selectConversation = useCallback((conversation) => {
    setActiveConversation(conversation);
    if (conversation) {
      loadMessages(conversation._id);
    } else {
      setMessages([]);
    }
  }, [loadMessages]);

  return (
    <ChatContext.Provider value={{
      conversations,
      setConversations,
      activeConversation,
      setActiveConversation,
      messages,
      setMessages,
      loadingConversations,
      loadingMessages,
      loadConversations,
      startConversation,
      loadMessages,
      addMessage,
      updateConversationLastMessage,
      selectConversation
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
