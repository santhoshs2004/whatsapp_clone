import ChatListItem from './ChatListItem';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';
import { getOtherParticipant } from '../utils/helpers';

const ChatList = ({ searchQuery }) => {
  const { user } = useAuth();
  const { conversations, loadingConversations, selectConversation, activeConversation } = useChat();

  const filteredConversations = conversations.filter((conv) => {
    if (!searchQuery) return true;
    const other = getOtherParticipant(conv.participants, user?._id);
    return other?.username?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (loadingConversations) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-wa-teal/30 border-t-wa-teal rounded-full animate-spin"></div>
          <p className="text-wa-text-secondary text-sm">Loading chats...</p>
        </div>
      </div>
    );
  }

  if (filteredConversations.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-wa-text-secondary text-sm">
            {searchQuery ? 'No chats found' : 'No conversations yet'}
          </p>
          {!searchQuery && (
            <p className="text-wa-text-secondary/60 text-xs mt-1">
              Click the new chat icon to start messaging
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {filteredConversations.map((conv) => (
        <ChatListItem
          key={conv._id}
          conversation={conv}
          isActive={activeConversation?._id === conv._id}
          onClick={() => selectConversation(conv)}
        />
      ))}
    </div>
  );
};

export default ChatList;
