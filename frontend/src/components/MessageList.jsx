import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/helpers';

const MessageList = () => {
  const { messages, loadingMessages } = useChat();
  const { user } = useAuth();
  const bottomRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Group messages by date
  const groupedMessages = messages.reduce((groups, msg) => {
    const date = formatDate(msg.createdAt);
    if (!groups[date]) groups[date] = [];
    groups[date].push(msg);
    return groups;
  }, {});

  if (loadingMessages) {
    return (
      <div className="flex-1 flex items-center justify-center chat-wallpaper">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-wa-teal/30 border-t-wa-teal rounded-full animate-spin"></div>
          <p className="text-wa-text-secondary text-sm">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto chat-wallpaper px-[5%] lg:px-[10%] py-2">
      {messages.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <div className="bg-wa-incoming/80 backdrop-blur-sm rounded-lg px-4 py-2 text-center scale-in">
            <p className="text-wa-text-secondary text-xs">
              🔒 Messages are end-to-end encrypted. No one outside of this chat can read them.
            </p>
          </div>
        </div>
      )}

      {Object.entries(groupedMessages).map(([date, msgs]) => (
        <div key={date}>
          {/* Date separator */}
          <div className="flex justify-center my-3">
            <span className="bg-wa-panel/90 backdrop-blur-sm text-wa-text-secondary text-[11px] font-medium px-3 py-1 rounded-md shadow-sm">
              {date}
            </span>
          </div>

          {/* Messages */}
          {msgs.map((msg, index) => (
            <MessageBubble
              key={msg._id}
              message={msg}
              isOwn={msg.sender?._id === user?._id || msg.sender === user?._id}
              showTail={
                index === 0 ||
                (msgs[index - 1]?.sender?._id || msgs[index - 1]?.sender) !==
                (msg.sender?._id || msg.sender)
              }
            />
          ))}
        </div>
      ))}

      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
