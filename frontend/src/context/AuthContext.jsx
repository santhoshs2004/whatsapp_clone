import { createContext, useContext, useState, useEffect } from 'react';
import { loginOrRegister, logoutUser, getUserById } from '../api/userApi';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore user from localStorage on mount
  useEffect(() => {
    const restore = async () => {
      const stored = localStorage.getItem('whatsappUser');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const { data } = await getUserById(parsed._id);
          setUser(data);
        } catch (err) {
          console.error('Failed to restore session:', err);
          localStorage.removeItem('whatsappUser');
        }
      }
      setLoading(false);
    };
    restore();
  }, []);

  const login = async (username, email, password) => {
    const { data } = await loginOrRegister({ username, email, password });
    setUser(data.user);
    localStorage.setItem('whatsappUser', JSON.stringify(data.user));
    return data;
  };

  const logout = async () => {
    if (user) {
      try {
        await logoutUser(user._id);
      } catch (err) {
        console.error('Logout error:', err);
      }
    }
    setUser(null);
    localStorage.removeItem('whatsappUser');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser, 
      login, 
      logout, 
      loading,
      currentUser: user,
      loginUser: login,
      logoutUser: logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
