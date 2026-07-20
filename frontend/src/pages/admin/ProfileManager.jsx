import React, { useState } from 'react';
import { User, Lock, Save, CheckCircle2, Upload } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api, { resolveImageUrl } from '../../services/api';

const ProfileManager = () => {
  const { user, updateUserProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    avatar: user?.avatar || '',
    githubUrl: user?.githubUrl || '',
    linkedinUrl: user?.linkedinUrl || '',
    twitterUrl: user?.twitterUrl || '',
    password: '',
  });

  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileFormData = new FormData();
    fileFormData.append('image', file);

    try {
      setUploadingAvatar(true);
      const res = await api.post('/upload', fileFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFormData((prev) => ({ ...prev, avatar: res.data.data.path }));
    } catch (err) {
      alert('Failed to upload avatar image');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');

    try {
      await updateUserProfile(formData);
      setSuccessMsg('Profile and security details updated successfully!');
      setFormData((prev) => ({ ...prev, password: '' }));
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Profile & Account Settings</h1>
        <p className="text-xs text-slate-400">Update your public avatar, social links, and admin password</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 rounded-3xl glass-panel border border-slate-800 space-y-6">
        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Profile Avatar */}
        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-indigo-500/50 bg-slate-950 shrink-0">
            <img src={resolveImageUrl(formData.avatar)} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-2 text-center sm:text-left flex-1">
            <h3 className="text-sm font-bold text-white">Profile Avatar</h3>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <label className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploadingAvatar ? 'Uploading...' : 'Upload New Photo'}</span>
                <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
              </label>
            </div>
            <input
              type="text"
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
              placeholder="Or paste avatar URL"
              className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              disabled
              value={user?.email || ''}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-xs cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Short Bio</label>
          <textarea
            rows="3"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub Profile Link</label>
            <input
              type="text"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              placeholder="https://github.com/username"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">LinkedIn Profile Link</label>
            <input
              type="text"
              value={formData.linkedinUrl}
              onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
              placeholder="https://linkedin.com/in/username"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Twitter / X Link</label>
            <input
              type="text"
              value={formData.twitterUrl}
              onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
              placeholder="https://twitter.com/username"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800">
          <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-400" />
            Security & Password Change
          </h3>
          <p className="text-xs text-slate-400 mb-3">Leave blank if you do not wish to change your current password.</p>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Enter new password (optional)"
            className="w-full max-w-md px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
          />
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg text-xs disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Updating...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileManager;
