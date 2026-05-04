import { createContext, useContext, useEffect, useState, useRef } from 'react';
import socket from '../socket/socket';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    if (user) {
      socket.connect();
      socketRef.current = socket;

      socket.emit('setup', user._id);

      socket.on('online-users', (users) => {
        setOnlineUsers(users);
      });

      socket.on('user-status-change', ({ userId, isOnline }) => {
        setOnlineUsers((prev) => {
          if (isOnline && !prev.includes(userId)) {
            return [...prev, userId];
          }
          if (!isOnline) {
            return prev.filter((id) => id !== userId);
          }
          return prev;
        });
      });

      return () => {
        socket.off('online-users');
        socket.off('user-status-change');
        socket.disconnect();
      };
    }
  }, [user]);

  const isUserOnline = (userId) => onlineUsers.includes(userId);

  return (
    <SocketContext.Provider value={{
      socket: socketRef.current || socket,
      onlineUsers,
      isUserOnline
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
