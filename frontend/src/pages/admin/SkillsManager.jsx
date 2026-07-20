import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Code, X } from 'lucide-react';
import api from '../../services/api';

const SkillsManager = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    proficiency: 85,
    icon: 'code',
  });

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await api.get('/skills');
      setSkills(res.data.data.skills);
    } catch (err) {
      console.error('Failed to fetch skills:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const openCreateModal = () => {
    setEditingSkill(null);
    setFormData({ name: '', category: 'Frontend', proficiency: 85, icon: 'code' });
    setModalOpen(true);
  };

  const openEditModal = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      icon: skill.icon || 'code',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        await api.put(`/skills/${editingSkill.id}`, formData);
      } else {
        await api.post('/skills', formData);
      }
      setModalOpen(false);
      fetchSkills();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save skill');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this skill from catalog?')) {
      try {
        await api.delete(`/skills/${id}`);
        fetchSkills();
      } catch (err) {
        alert('Failed to delete skill');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Skills Catalog Manager</h1>
          <p className="text-xs text-slate-400">Manage technical stack categories and proficiency levels</p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all text-xs shadow-lg shadow-indigo-500/20"
        >
          <Plus className="w-4 h-4" />
          Add New Skill
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-400 text-sm">Loading skills...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div key={skill.id} className="p-5 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{skill.name}</h3>
                  <span className="text-[11px] text-slate-400">{skill.category} • {skill.proficiency}%</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(skill)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(skill.id)}
                  className="p-1.5 rounded-lg bg-slate-800 text-rose-400 hover:bg-rose-600 hover:text-white"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">{editingSkill ? 'Edit Skill' : 'Add Skill'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. React.js, PostgreSQL"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Tools">Tools</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Proficiency ({formData.proficiency}%)</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={formData.proficiency}
                  onChange={(e) => setFormData({ ...formData, proficiency: e.target.value })}
                  className="w-full"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs text-slate-400">Cancel</button>
                <button type="submit" className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsManager;
