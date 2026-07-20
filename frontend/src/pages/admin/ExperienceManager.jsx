import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Briefcase, Calendar, X } from 'lucide-react';
import api from '../../services/api';

const ExperienceManager = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState(null);

  const [formData, setFormData] = useState({
    role: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  });

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const res = await api.get('/experiences');
      setExperiences(res.data.data.experiences);
    } catch (err) {
      console.error('Failed to fetch experience list:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const openCreateModal = () => {
    setEditingExp(null);
    setFormData({
      role: '',
      company: '',
      location: 'Remote',
      startDate: 'Jan 2024',
      endDate: 'Present',
      current: true,
      description: '',
    });
    setModalOpen(true);
  };

  const openEditModal = (exp) => {
    setEditingExp(exp);
    setFormData({
      role: exp.role,
      company: exp.company,
      location: exp.location || '',
      startDate: exp.startDate,
      endDate: exp.endDate || '',
      current: exp.current || false,
      description: exp.description,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingExp) {
        await api.put(`/experiences/${editingExp.id}`, formData);
      } else {
        await api.post('/experiences', formData);
      }
      setModalOpen(false);
      fetchExperiences();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save experience entry');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this experience entry?')) {
      try {
        await api.delete(`/experiences/${id}`);
        fetchExperiences();
      } catch (err) {
        alert('Failed to delete experience item');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Experience Timeline Manager</h1>
          <p className="text-xs text-slate-400">Manage work experience entries, companies, and roles</p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all text-xs shadow-lg shadow-indigo-500/20"
        >
          <Plus className="w-4 h-4" />
          Add Experience Entry
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-400 text-sm">Loading timeline...</div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col sm:flex-row justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-base">{exp.role}</h3>
                  <span className="text-xs font-semibold text-indigo-400">@ {exp.company}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                  {exp.location && <span>• {exp.location}</span>}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mt-2">{exp.description}</p>
              </div>

              <div className="flex items-start gap-2 shrink-0">
                <button onClick={() => openEditModal(exp)} className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(exp.id)} className="p-2 rounded-lg bg-slate-800 text-rose-400 hover:bg-rose-600 hover:text-white">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">{editingExp ? 'Edit Experience' : 'Add Experience'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Role / Job Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Senior Full Stack Developer"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="TechCorp Labs"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Start Date *</label>
                  <input
                    type="text"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    placeholder="Jan 2023"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">End Date</label>
                  <input
                    type="text"
                    disabled={formData.current}
                    value={formData.current ? 'Present' : formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    placeholder="Dec 2024"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Remote / SF"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="current"
                  checked={formData.current}
                  onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-800"
                />
                <label htmlFor="current" className="text-xs font-semibold text-slate-300 cursor-pointer">
                  Currently working in this role
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description *</label>
                <textarea
                  rows="4"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Key responsibilities, stack used, and achievements..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs text-slate-400">Cancel</button>
                <button type="submit" className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl">Save Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceManager;
