const UserAvatar = ({ user, className = '' }) => {
  if (!user) return null;
  
  return (
    <div
      className={`rounded-full flex items-center justify-center text-white font-semibold shrink-0 cursor-pointer hover:opacity-80 transition-opacity overflow-hidden ${className}`}
      style={{ backgroundColor: user.avatarColor || '#00A884' }}
    >
      {user.profilePic ? (
        <img src={user.profilePic} alt={user.username} className="w-full h-full object-cover" />
      ) : (
        user.username?.charAt(0).toUpperCase() || '?'
      )}
    </div>
  );
};

export default UserAvatar;
