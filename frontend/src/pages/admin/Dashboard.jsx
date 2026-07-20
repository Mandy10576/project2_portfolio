import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  Code2,
  Briefcase,
  User,
  Plus,
  ArrowUpRight,
  ShieldAlert,
  CheckCircle2,
  Layers
} from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ projects: 0, skills: 0, experiences: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projRes, skillRes, expRes] = await Promise.all([
          api.get('/projects'),
          api.get('/skills'),
          api.get('/experiences'),
        ]);

        setStats({
          projects: projRes.data.results || 0,
          skills: skillRes.data.results || 0,
          experiences: expRes.data.results || 0,
        });
      } catch (error) {
        console.error('Failed to load dashboard metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { title: 'Total Projects', count: stats.projects, icon: FolderGit2, link: '/admin/projects', color: 'from-blue-500/20 to-indigo-500/20' },
    { title: 'Skills Catalog', count: stats.skills, icon: Code2, link: '/admin/skills', color: 'from-purple-500/20 to-pink-500/20' },
    { title: 'Experience Records', count: stats.experiences, icon: Briefcase, link: '/admin/experience', color: 'from-emerald-500/20 to-teal-500/20' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border border-indigo-500/30 relative overflow-hidden">
        <div className="relative z-10">
          <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            Admin CMS Active
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-3">
            Welcome back, {user?.name || 'Admin'}! 👋
          </h1>
          <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Manage your full-stack portfolio content, update skills, upload project preview images, and edit your professional details in real-time.
          </p>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="p-6 rounded-2xl glass-card border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400 block mb-1">{card.title}</span>
                <span className="text-3xl font-extrabold text-white">
                  {loading ? '...' : card.count}
                </span>
                <div className="mt-3">
                  <Link
                    to={card.link}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                  >
                    Manage Section
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${card.color} text-indigo-300 border border-slate-700/50`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Shortcuts */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800">
        <h2 className="text-lg font-bold text-white mb-4">Quick Management Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/projects"
            className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 flex items-center gap-3 transition-all group"
          >
            <div className="p-2.5 rounded-lg bg-indigo-600/20 text-indigo-400">
              <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Add New Project</h3>
              <p className="text-[11px] text-slate-400">Title, links, tech & image</p>
            </div>
          </Link>

          <Link
            to="/admin/skills"
            className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 flex items-center gap-3 transition-all group"
          >
            <div className="p-2.5 rounded-lg bg-purple-600/20 text-purple-400">
              <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Add Technical Skill</h3>
              <p className="text-[11px] text-slate-400">Frontend, backend, DB</p>
            </div>
          </Link>

          <Link
            to="/admin/about"
            className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 flex items-center gap-3 transition-all group"
          >
            <div className="p-2.5 rounded-lg bg-emerald-600/20 text-emerald-400">
              <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Edit Bio & Stats</h3>
              <p className="text-[11px] text-slate-400">Headline & counter stats</p>
            </div>
          </Link>

          <Link
            to="/admin/profile"
            className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 flex items-center gap-3 transition-all group"
          >
            <div className="p-2.5 rounded-lg bg-amber-600/20 text-amber-400">
              <Layers className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Account Security</h3>
              <p className="text-[11px] text-slate-400">Update password & profile</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
