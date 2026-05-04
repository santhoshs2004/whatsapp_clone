import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { getOtherParticipant, formatTime, truncateText } from '../utils/helpers';
import UserAvatar from './UserAvatar';

const ChatListItem = ({ conversation, isActive, onClick }) => {
  const { user } = useAuth();
  const { isUserOnline } = useSocket();

  const otherUser = getOtherParticipant(conversation.participants, user?._id);
  const isOnline = isUserOnline(otherUser?._id);
  const lastMsg = conversation.lastMessage;

  return (
    <div
      id={`chat-${conversation._id}`}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-3 cursor-pointer transition-colors duration-150 border-b border-wa-border/20 ${
        isActive
          ? 'bg-wa-active'
          : 'hover:bg-wa-hover'
      }`}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <UserAvatar user={otherUser} className="w-12 h-12 text-lg" />
        {isOnline && (
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-wa-teal rounded-full border-2 border-wa-dark-bg online-pulse"></div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-wa-text-primary text-[15px] font-medium truncate">
            {otherUser?.username || 'Unknown'}
          </h3>
          {lastMsg?.createdAt && (
            <span className="text-wa-text-secondary text-xs shrink-0 ml-2">
              {formatTime(lastMsg.createdAt)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          {/* Read receipt icon for sent messages */}
          {lastMsg?.sender === user?._id && (
            <svg className="w-4 h-4 text-wa-blue shrink-0" viewBox="0 0 16 15" fill="currentColor">
              <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.033l-.358-.325a.32.32 0 0 0-.484.033l-.223.28a.32.32 0 0 0 .036.44l1.09.98a.32.32 0 0 0 .484-.034l6.272-8.048a.365.365 0 0 0-.063-.51zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.033L1.891 7.77a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"/>
            </svg>
          )}
          <p className="text-wa-text-secondary text-sm truncate">
            {lastMsg?.text ? truncateText(lastMsg.text) : 'Start a conversation'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
