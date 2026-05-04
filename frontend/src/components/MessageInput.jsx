import { useState, useRef, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState('');
  const { socket } = useSocket();
  const { user } = useAuth();
  const { activeConversation } = useChat();
  const inputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Focus input when conversation changes
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeConversation]);

  const handleTyping = () => {
    if (!socket || !activeConversation) return;

    socket.emit('typing', {
      conversationId: activeConversation._id,
      userId: user._id,
      username: user.username
    });

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Stop typing after 2s of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('stop-typing', {
        conversationId: activeConversation._id,
        userId: user._id
      });
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    onSend(trimmed);
    setText('');

    // Stop typing indicator
    if (socket && activeConversation) {
      socket.emit('stop-typing', {
        conversationId: activeConversation._id,
        userId: user._id
      });
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="px-4 py-2.5 bg-wa-panel border-t border-wa-border/20">
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        {/* Emoji button */}
        <button
          type="button"
          className="w-10 h-10 rounded-full flex items-center justify-center text-wa-text-secondary hover:bg-wa-hover transition-colors shrink-0"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        {/* Attachment button */}
        <button
          type="button"
          className="w-10 h-10 rounded-full flex items-center justify-center text-wa-text-secondary hover:bg-wa-hover transition-colors shrink-0"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>

        {/* Text input */}
        <div className="flex-1 bg-wa-input rounded-lg px-4 py-2.5 min-h-[42px] flex items-center">
          <textarea
            ref={inputRef}
            id="message-input"
            value={text}
            onChange={(e) => { setText(e.target.value); handleTyping(); }}
            onKeyDown={handleKeyDown}
            placeholder="Type a message"
            rows={1}
            className="w-full bg-transparent text-wa-text-primary placeholder-wa-text-secondary/60 text-sm resize-none focus:outline-none max-h-[120px] leading-5"
            style={{ height: 'auto', minHeight: '20px' }}
          />
        </div>

        {/* Send / Voice button */}
        <button
          type="submit"
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-200"
        >
          {text.trim() ? (
            <div className="w-10 h-10 rounded-full bg-wa-teal flex items-center justify-center hover:bg-[#00bf99] transition-colors shadow-md shadow-wa-teal/20">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"/>
              </svg>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-wa-text-secondary hover:bg-wa-hover transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
