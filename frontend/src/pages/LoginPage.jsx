import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Lock, Mail, User, Eye, EyeOff, UserPlus, LogIn, Sparkles } from 'lucide-react';

const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await login(username.trim(), email.trim(), password);
      toast.success(isRegistering ? 'Account created successfully!' : 'Successfully logged in!');
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message || 'Something went wrong. Please try again.';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] relative overflow-hidden font-inter">
      {/* Light Glassy Background Decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-wa-teal/20 blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#00a884]/10 blur-[120px] animate-pulse delay-700"></div>
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-[#25d366]/10 blur-[100px] animate-pulse delay-1000"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#00a884 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4 py-8 fade-in">
        {/* White Glassmorphism Card */}
        <div className="backdrop-blur-xl bg-white/70 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-white/50 overflow-hidden scale-in">
          {/* Header */}
          <div className="p-10 pb-6 text-center bg-white/30">
            {/* Premium WhatsApp Icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-[#25d366] to-[#075e54] flex items-center justify-center shadow-xl shadow-[#25d366]/30 transform hover:scale-105 transition-transform duration-300">
               <svg viewBox="0 0 24 24" className="w-10 h-10 text-white fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-[#075e54] mb-2 tracking-tight">WhatsApp Web</h1>
            <p className="text-gray-500 text-sm font-medium">
              {isRegistering ? 'Join the community today' : 'Welcome back! Log in to continue'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-10 pb-10 space-y-6 pt-4">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-2xl px-5 py-4 scale-in flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></div>
                {error}
              </div>
            )}

            {/* Username Input */}
            <div className="space-y-2">
              <label className="text-gray-400 text-[11px] font-bold uppercase tracking-widest pl-1">
                Username
              </label>
              <div className="relative group flex items-center">
                <div className="absolute left-4 pointer-events-none transition-transform group-focus-within:scale-110">
                  <User className="w-5 h-5 text-gray-400 group-focus-within:text-[#00a884] transition-colors" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your unique name"
                  style={{ paddingLeft: '3.5rem' }}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl pr-4 py-4 text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#00a884]/40 focus:bg-white focus:ring-4 focus:ring-[#00a884]/5 transition-all duration-300"
                  autoFocus
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-gray-400 text-[11px] font-bold uppercase tracking-widest pl-1">
                Email Address
              </label>
              <div className="relative group flex items-center">
                <div className="absolute left-4 pointer-events-none transition-transform group-focus-within:scale-110">
                  <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-[#00a884] transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hello@example.com"
                  style={{ paddingLeft: '3.5rem' }}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl pr-4 py-4 text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#00a884]/40 focus:bg-white focus:ring-4 focus:ring-[#00a884]/5 transition-all duration-300"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-gray-400 text-[11px] font-bold uppercase tracking-widest pl-1">
                Security Password
              </label>
              <div className="relative group flex items-center">
                <div className="absolute left-4 pointer-events-none transition-transform group-focus-within:scale-110">
                  <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-[#00a884] transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ paddingLeft: '3.5rem' }}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl pr-12 py-4 text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#00a884]/40 focus:bg-white focus:ring-4 focus:ring-[#00a884]/5 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-gray-400 hover:text-[#00a884] transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#25d366] to-[#00a884] hover:brightness-105 text-white font-bold py-4.5 rounded-2xl transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-[#25d366]/20 mt-4 flex items-center justify-center gap-3 group"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="tracking-wide">Processing...</span>
                </>
              ) : (
                <>
                  <span className="tracking-wide">{isRegistering ? 'Create My Account' : 'Log In to Chat'}</span>
                  {isRegistering ? <UserPlus className="w-5 h-5 group-hover:rotate-12 transition-transform" /> : <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </>
              )}
            </button>

            {/* Toggle Link */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-gray-500 hover:text-[#00a884] text-[13px] font-semibold transition-colors flex items-center justify-center gap-2 mx-auto group"
              >
                {isRegistering ? (
                  <>
                    <span>Already a member?</span>
                    <span className="text-[#00a884] group-hover:underline underline-offset-4">Log In</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#25d366]" />
                    <span>New here?</span>
                    <span className="text-[#00a884] group-hover:underline underline-offset-4">Create Account</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
