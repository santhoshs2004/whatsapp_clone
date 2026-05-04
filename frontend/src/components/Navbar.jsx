import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { useChat } from '../context/ChatContext';
import { getOtherParticipant, formatLastSeen } from '../utils/helpers';
import UserAvatar from './UserAvatar';

const Navbar = () => {
  const { user } = useAuth();
  const { socket, isUserOnline } = useSocket();
  const { activeConversation, selectConversation } = useChat();
  const [isTyping, setIsTyping] = useState(false);

  const otherUser = getOtherParticipant(activeConversation?.participants, user?._id);
  const online = isUserOnline(otherUser?._id);

  // Listen for typing
  useEffect(() => {
    if (!socket) return;

    const handleTyping = ({ userId }) => {
      if (userId === otherUser?._id) setIsTyping(true);
    };
    const handleStopTyping = ({ userId }) => {
      if (userId === otherUser?._id) setIsTyping(false);
    };

    socket.on('user-typing', handleTyping);
    socket.on('user-stop-typing', handleStopTyping);

    return () => {
      socket.off('user-typing', handleTyping);
      socket.off('user-stop-typing', handleStopTyping);
    };
  }, [socket, otherUser]);

  const getStatusText = () => {
    if (isTyping) return 'typing...';
    if (online) return 'online';
    if (otherUser?.lastSeen) return `last seen ${formatLastSeen(otherUser.lastSeen)}`;
    return 'offline';
  };

  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-wa-panel border-b border-wa-border/20 min-h-[60px]">
      <div className="flex items-center gap-3">
        {/* Back button (mobile) */}
        <button
          onClick={() => selectConversation(null)}
          className="lg:hidden w-8 h-8 flex items-center justify-center text-wa-text-secondary hover:text-wa-text-primary transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Avatar */}
        <div className="relative">
          <UserAvatar user={otherUser} className="w-10 h-10 text-sm" />
          {online && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-wa-teal rounded-full border-2 border-wa-panel"></div>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0">
          <h3 className="text-wa-text-primary text-[15px] font-medium truncate">
            {otherUser?.username || 'Unknown'}
          </h3>
          <p className={`text-xs truncate transition-colors ${
            isTyping ? 'text-wa-teal' : online ? 'text-wa-teal' : 'text-wa-text-secondary'
          }`}>
            {getStatusText()}
          </p>
        </div>
      </div>

      {/* Header actions */}
      <div className="flex items-center gap-1">
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-wa-text-secondary hover:bg-wa-hover transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-wa-text-secondary hover:bg-wa-hover transition-colors">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
