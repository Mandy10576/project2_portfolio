import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../../services/api';

const AboutManager = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    headline: '',
    bio: '',
    experienceYears: 3,
    completedProjects: 15,
    clientsCount: 10,
    location: '',
    email: '',
    phone: '',
    resumeUrl: '',
  });

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await api.get('/about');
        if (res.data.data.about) {
          setFormData(res.data.data.about);
        }
      } catch (err) {
        console.error('Failed to load about data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');

    try {
      const res = await api.put('/about', formData);
      setSuccessMsg('About section updated successfully!');
      setFormData(res.data.data.about);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update about details');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="py-12 text-center text-slate-400 text-sm">Loading About details...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">About Section CMS</h1>
        <p className="text-xs text-slate-400">Update main tagline, bio overview, statistics counters, and contact details</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 rounded-3xl glass-panel border border-slate-800 space-y-6">
        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Headline Tagline *</label>
          <input
            type="text"
            required
            value={formData.headline || ''}
            onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
            placeholder="Full Stack Software Engineer & Cloud Architect"
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Bio & Introduction Story *</label>
          <textarea
            rows="5"
            required
            value={formData.bio || ''}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Tell your background, passions, and core engineering philosophy..."
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Years of Experience</label>
            <input
              type="number"
              min="0"
              value={formData.experienceYears || 0}
              onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Completed Projects</label>
            <input
              type="number"
              min="0"
              value={formData.completedProjects || 0}
              onChange={(e) => setFormData({ ...formData, completedProjects: Number(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Satisfied Clients</label>
            <input
              type="number"
              min="0"
              value={formData.clientsCount || 0}
              onChange={(e) => setFormData({ ...formData, clientsCount: Number(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
            <input
              type="text"
              value={formData.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="San Francisco, CA"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Email</label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="alex@example.com"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
            <input
              type="text"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 019-2834"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Resume / CV Link (URL)</label>
            <input
              type="text"
              value={formData.resumeUrl || ''}
              onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
              placeholder="https://example.com/resume.pdf"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/20 text-xs disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save About Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutManager;
