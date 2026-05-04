import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateUser } from '../api/userApi';
import toast from 'react-hot-toast';
import { Camera, User, FileText, Globe, Share2, X, Save, Palette, Heart } from 'lucide-react';

const SettingsModal = ({ onClose }) => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    username: user?.username || '',
    bio: user?.bio || 'Hey there! I am using WhatsApp.',
    profilePic: user?.profilePic || '',
    instagram: user?.instagram || '',
    facebook: user?.facebook || '',
    avatarColor: user?.avatarColor || '#22c55e'
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const { data } = await updateUser(user._id, formData);
      setUser(data);
      localStorage.setItem('whatsappUser', JSON.stringify(data));
      toast.success('Profile updated successfully!');
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Premium Backdrop */}
      <div 
        className="absolute inset-0 bg-white/40 backdrop-blur-md transition-all duration-500"
        onClick={onClose}
      ></div>

      {/* White Glassmorphism Modal */}
      <div className="relative w-full max-w-xl overflow-hidden bg-white/70 backdrop-blur-2xl rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.15)] border border-white/50 scale-in flex flex-col max-h-[90vh]">
        
        {/* Header Section */}
        <div className="p-8 pb-4 flex items-center justify-between border-b border-gray-100/50">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#25d366] to-[#075e54] flex items-center justify-center shadow-lg shadow-[#25d366]/20">
                <Palette className="w-6 h-6 text-white" />
             </div>
             <div>
                <h2 className="text-2xl font-black text-[#075e54] tracking-tight">Profile Settings</h2>
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Customize your identity</p>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-300 group"
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 pt-6 custom-scrollbar">
          <form onSubmit={handleSave} className="space-y-8">
            
            {/* Profile Picture & Avatar Color */}
            <div className="flex flex-col items-center gap-6 p-6 rounded-[2.5rem] bg-gray-50/50 border border-gray-100">
              <div className="relative group">
                <div 
                  className="w-32 h-32 rounded-[2.5rem] flex items-center justify-center overflow-hidden border-4 border-white shadow-2xl transition-transform group-hover:scale-105 duration-500"
                  style={{ backgroundColor: formData.avatarColor }}
                >
                  {formData.profilePic ? (
                    <img src={formData.profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-5xl text-white font-black">{formData.username?.[0]?.toUpperCase()}</span>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center text-[#25d366] border border-gray-100">
                   <Camera className="w-5 h-5" />
                </div>
              </div>
              
              <div className="w-full space-y-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-[#075e54] uppercase tracking-widest pl-1">Display Photo URL</label>
                  <input
                    type="text"
                    name="profilePic"
                    value={formData.profilePic}
                    onChange={handleChange}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-sm text-gray-700 focus:outline-none focus:border-[#25d366]/50 focus:ring-4 focus:ring-[#25d366]/5 transition-all shadow-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-[#075e54] uppercase tracking-widest pl-1">Theme Color</label>
                  <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-gray-200 shadow-sm">
                    <input
                      type="color"
                      name="avatarColor"
                      value={formData.avatarColor}
                      onChange={handleChange}
                      className="w-12 h-12 bg-transparent rounded-xl cursor-pointer overflow-hidden border-none"
                    />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{formData.avatarColor}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-[#075e54] uppercase tracking-widest pl-1">Your Name</label>
                <div className="relative flex items-center group">
                  <div className="absolute left-5 text-gray-400 group-focus-within:text-[#25d366] transition-colors">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    style={{ paddingLeft: '3.5rem' }}
                    className="w-full bg-white border border-gray-200 rounded-2xl pr-4 py-4.5 text-sm text-gray-700 focus:outline-none focus:border-[#25d366]/50 focus:ring-4 focus:ring-[#25d366]/5 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-[#075e54] uppercase tracking-widest pl-1">Bio / Status</label>
                <div className="relative flex items-start group">
                  <div className="absolute left-5 top-5 text-gray-400 group-focus-within:text-[#25d366] transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={2}
                    style={{ paddingLeft: '3.5rem' }}
                    className="w-full bg-white border border-gray-200 rounded-2xl pr-4 py-4.5 text-sm text-gray-700 focus:outline-none focus:border-[#25d366]/50 focus:ring-4 focus:ring-[#25d366]/5 transition-all shadow-sm resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Social Connect */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                 <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                 <label className="text-[11px] font-black text-[#075e54] uppercase tracking-widest">Connect Socials</label>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="relative flex items-center group">
                  <div className="absolute left-5 w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
                    <Globe className="w-4 h-4 text-white" />
                  </div>
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="Instagram URL"
                    style={{ paddingLeft: '4.5rem' }}
                    className="w-full bg-white border border-gray-200 rounded-2xl pr-4 py-4 text-sm text-gray-700 focus:outline-none focus:border-[#25d366]/50 transition-all shadow-sm"
                  />
                </div>
                
                <div className="relative flex items-center group">
                  <div className="absolute left-5 w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
                    <Share2 className="w-4 h-4 text-white" />
                  </div>
                  <input
                    type="text"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    placeholder="Facebook URL"
                    style={{ paddingLeft: '4.5rem' }}
                    className="w-full bg-white border border-gray-200 rounded-2xl pr-4 py-4 text-sm text-gray-700 focus:outline-none focus:border-[#25d366]/50 transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer Action */}
        <div className="p-8 pt-4 border-t border-gray-100/50 bg-white/30">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-gradient-to-r from-[#25d366] to-[#075e54] hover:brightness-110 text-white font-black py-5 rounded-[1.5rem] transition-all duration-300 shadow-2xl shadow-[#25d366]/30 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="tracking-widest uppercase text-xs">Syncing Profile...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span className="tracking-widest uppercase text-xs">Save Experience</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
