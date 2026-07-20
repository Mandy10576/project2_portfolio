import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Upload, Star, ExternalLink, Github, Calendar, Check, X, Image as ImageIcon } from 'lucide-react';
import api, { resolveImageUrl } from '../../services/api';

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    liveDemoUrl: '',
    image: '',
    featured: false,
    createdDate: new Date().toISOString().split('T')[0],
  });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get('/projects');
      setProjects(res.data.data.projects);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      technologies: '',
      githubUrl: '',
      liveDemoUrl: '',
      image: '',
      featured: false,
      createdDate: new Date().toISOString().split('T')[0],
    });
    setModalOpen(true);
  };

  const openEditModal = (proj) => {
    setEditingProject(proj);
    setFormData({
      title: proj.title,
      description: proj.description,
      technologies: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies,
      githubUrl: proj.githubUrl || '',
      liveDemoUrl: proj.liveDemoUrl || '',
      image: proj.image || '',
      featured: proj.featured || false,
      createdDate: proj.createdDate ? new Date(proj.createdDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    });
    setModalOpen(true);
  };

  // Image File Upload Handler (POST /api/upload)
  const handleImageFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileFormData = new FormData();
    fileFormData.append('image', file);

    try {
      setUploadingImage(true);
      const res = await api.post('/upload', fileFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFormData((prev) => ({ ...prev, image: res.data.data.path }));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  // Delete Image Handler (DELETE /api/upload/:filename)
  const handleDeleteImage = async () => {
    if (!formData.image) return;

    // Check if local file path e.g. /uploads/file-123.png
    if (formData.image.startsWith('/uploads/')) {
      const filename = formData.image.replace('/uploads/', '');
      try {
        await api.delete(`/upload/${filename}`);
      } catch (err) {
        console.warn('Could not delete image file from server:', err);
      }
    }
    setFormData((prev) => ({ ...prev, image: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      technologies: formData.technologies.split(',').map((t) => t.trim()).filter(Boolean),
    };

    try {
      if (editingProject) {
        await api.put(`/projects/${editingProject.id}`, payload);
      } else {
        await api.post('/projects', payload);
      }
      setModalOpen(false);
      fetchProjects();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save project');
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/projects/${id}`);
        fetchProjects();
      } catch (err) {
        alert('Failed to delete project');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Projects Manager</h1>
          <p className="text-xs text-slate-400">Add, edit, upload images, and manage portfolio projects</p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all text-xs shadow-lg shadow-indigo-500/20"
        >
          <Plus className="w-4 h-4" />
          Add New Project
        </button>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="py-12 text-center text-slate-400 text-sm">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="p-12 text-center glass-panel rounded-2xl border border-slate-800 text-slate-400 text-sm">
          No projects found. Click "Add New Project" to create your first portfolio entry.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <div key={proj.id} className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 mb-4">
                  <img
                    src={resolveImageUrl(proj.image)}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                  />
                  {proj.featured && (
                    <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center gap-1">
                      <Star className="w-3 h-3 fill-slate-950" /> Featured
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white text-lg">{proj.title}</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(proj)}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-indigo-600 transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="p-1.5 rounded-lg bg-slate-800 text-rose-400 hover:bg-rose-600 hover:text-white transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 mb-4">{proj.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {proj.technologies?.map((tech, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-medium text-indigo-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>{new Date(proj.createdDate).toLocaleDateString()}</span>
                <div className="flex gap-3">
                  {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="hover:text-white"><Github className="w-4 h-4" /></a>}
                  {proj.liveDemoUrl && <a href={proj.liveDemoUrl} target="_blank" rel="noreferrer" className="hover:text-indigo-400"><ExternalLink className="w-4 h-4" /></a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form for Create / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-2xl my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {editingProject ? 'Edit Project' : 'Create New Project'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="p-2 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. AI Content Platform"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description *</label>
                <textarea
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary of features and architecture..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Technologies (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React, Node.js, Express, PostgreSQL, Prisma"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Image Upload / URL Section */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <label className="block text-xs font-semibold text-slate-300">Project Image (Upload or URL)</label>
                
                {formData.image ? (
                  <div className="relative aspect-video max-h-40 rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                    <img src={resolveImageUrl(formData.image)} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={handleDeleteImage}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 text-xs flex items-center gap-1 shadow"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete Image
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <label className="flex-1 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-slate-800 hover:border-indigo-500 cursor-pointer text-xs text-slate-400 transition-colors">
                      <Upload className="w-4 h-4 text-indigo-400" />
                      <span>{uploadingImage ? 'Uploading Image...' : 'Upload Image File'}</span>
                      <input type="file" accept="image/*" onChange={handleImageFileUpload} className="hidden" />
                    </label>
                  </div>
                )}

                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="Or paste image URL directly (e.g. https://...)"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/username/project"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    value={formData.liveDemoUrl}
                    onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
                    placeholder="https://myproject.vercel.app"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Created Date</label>
                  <input
                    type="date"
                    value={formData.createdDate}
                    onChange={(e) => setFormData({ ...formData, createdDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-800"
                  />
                  <label htmlFor="featured" className="text-xs font-semibold text-slate-300 cursor-pointer">
                    Highlight as Featured Project
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/20"
                >
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;
