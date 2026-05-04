import { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import EmptyChat from '../components/EmptyChat';
import { useChat } from '../context/ChatContext';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';

const ChatPage = () => {
  const { user } = useAuth();
  const { socket } = useSocket();
  const {
    activeConversation,
    loadConversations,
    addMessage,
    updateConversationLastMessage
  } = useChat();

  // Load conversations on mount
  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  // Listen for new messages globally (for sidebar updates)
  useEffect(() => {
    if (!socket) return;

    const handleConversationUpdate = ({ conversationId, lastMessage }) => {
      updateConversationLastMessage(conversationId, lastMessage);
    };

    socket.on('receive_message', handleConversationUpdate);

    return () => {
      socket.off('receive_message', handleConversationUpdate);
    };
  }, [socket, updateConversationLastMessage]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#d1d7db] relative overflow-hidden">
      {/* Background green stripe */}
      <div className="absolute top-0 left-0 w-full h-[127px] bg-[#00a884] z-0"></div>

      {/* Main container with subtle shadow */}
      <div className="flex w-full h-full max-w-[1600px] max-h-[95vh] xl:max-h-[900px] xl:rounded-sm overflow-hidden shadow-2xl shadow-black/20 border border-wa-border/20 z-10 mx-auto">
        {/* Sidebar */}
        <Sidebar />

        {/* Chat area */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#efeae2]">
          {activeConversation ? (
            <ChatWindow />
          ) : (
            <EmptyChat />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
