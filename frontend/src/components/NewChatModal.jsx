import { useState, useEffect } from 'react';
import { getAllUsers } from '../api/userApi';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { useSocket } from '../context/SocketContext';

const NewChatModal = ({ onClose }) => {
  const { user } = useAuth();
  const { startConversation, selectConversation } = useChat();
  const { isUserOnline } = useSocket();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await getAllUsers(user._id);
        setUsers(data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [user._id]);

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectUser = async (selectedUser) => {
    const conv = await startConversation(selectedUser._id);
    if (conv) {
      selectConversation(conv);
    }
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-wa-dark-bg fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 px-5 py-4 bg-wa-panel">
        <button
          onClick={onClose}
          className="text-wa-text-primary hover:text-wa-teal transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h2 className="text-wa-text-primary text-lg font-medium">New chat</h2>
      </div>

      {/* Search */}
      <div className="px-3 py-2">
        <div className="flex items-center bg-wa-input rounded-lg px-3 py-1.5 gap-3">
          <svg className="w-4 h-4 text-wa-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contacts"
            className="flex-1 bg-transparent text-wa-text-primary placeholder-wa-text-secondary/60 text-sm py-1 focus:outline-none"
            autoFocus
          />
        </div>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <div className="w-6 h-6 border-2 border-wa-teal/30 border-t-wa-teal rounded-full animate-spin"></div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-wa-text-secondary text-sm">No contacts found</p>
          </div>
        ) : (
          <>
            <p className="px-6 py-3 text-wa-teal text-xs font-medium uppercase tracking-wider">
              Contacts on WhatsApp
            </p>
            {filteredUsers.map((u) => (
              <div
                key={u._id}
                onClick={() => handleSelectUser(u)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-wa-hover cursor-pointer transition-colors border-b border-wa-border/15"
              >
                <div className="relative shrink-0">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg"
                    style={{ backgroundColor: u.avatarColor }}
                  >
                    {u.username.charAt(0).toUpperCase()}
                  </div>
                  {isUserOnline(u._id) && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-wa-teal rounded-full border-2 border-wa-dark-bg"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-wa-text-primary text-[15px] font-medium truncate">{u.username}</h3>
                  <p className="text-wa-text-secondary text-xs truncate">{u.about}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default NewChatModal;
