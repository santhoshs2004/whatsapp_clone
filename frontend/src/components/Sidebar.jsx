import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import ChatList from './ChatList';
import NewChatModal from './NewChatModal';
import SettingsModal from './SettingsModal';
import { useAuth } from '../context/AuthContext';
import UserAvatar from './UserAvatar';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewChat, setShowNewChat] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Close menu on outside click
  useEffect(() => {
    const handleClick = () => setShowMenu(false);
    if (showMenu) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [showMenu]);

  return (
    <div className="w-[360px] min-w-[360px] flex flex-col bg-wa-dark-bg border-r border-wa-border/40 relative">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-wa-panel min-h-[60px]">
        {/* Avatar */}
        <div className="flex items-center gap-3">
          <UserAvatar user={user} className="w-10 h-10 text-sm" />
          <div className="flex flex-col">
            <span className="text-wa-text-primary text-sm font-medium hidden lg:block">
              {user?.username}
            </span>
            <span className="text-[10px] text-wa-text-secondary truncate max-w-[120px] hidden lg:block italic">
              {user?.bio || 'Available'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* New Chat Button */}
          <button
            id="new-chat-btn"
            onClick={() => setShowNewChat(true)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-wa-text-secondary hover:bg-wa-hover transition-colors"
            title="New chat"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"/>
            </svg>
          </button>

          {/* Menu Button */}
          <div className="relative">
            <button
              id="menu-btn"
              onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-wa-text-secondary hover:bg-wa-hover transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"/>
              </svg>
            </button>

            {/* Dropdown */}
            {showMenu && (
              <div className="absolute right-0 top-12 w-52 bg-wa-panel rounded-md shadow-xl shadow-black/30 border border-wa-border/30 py-2 z-50 scale-in">
                <button
                  onClick={() => setShowSettings(true)}
                  className="w-full px-6 py-2.5 text-left text-sm text-wa-text-primary hover:bg-wa-hover transition-colors flex items-center gap-3"
                >
                  <svg className="w-4 h-4 text-wa-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </button>
                <button
                  id="logout-btn"
                  onClick={logout}
                  className="w-full px-6 py-2.5 text-left text-sm text-wa-text-primary hover:bg-wa-hover transition-colors flex items-center gap-3 border-t border-wa-border/20 mt-1"
                >
                  <svg className="w-4 h-4 text-wa-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search */}
      <SearchBar query={searchQuery} setQuery={setSearchQuery} />

      {/* Chat List */}
      <ChatList searchQuery={searchQuery} />

      {/* New Chat Modal */}
      {showNewChat && (
        <NewChatModal onClose={() => setShowNewChat(false)} />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
};

export default Sidebar;
