import React from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderGit2,
  Code2,
  Briefcase,
  User,
  LogOut,
  Globe,
  ShieldCheck,
  ChevronRight,
  FileText
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Projects CMS', path: '/admin/projects', icon: FolderGit2 },
    { name: 'Skills CMS', path: '/admin/skills', icon: Code2 },
    { name: 'Experience CMS', path: '/admin/experience', icon: Briefcase },
    { name: 'About CMS', path: '/admin/about', icon: FileText },
    { name: 'Profile & Security', path: '/admin/profile', icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900/90 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-white text-base leading-tight">Admin CMS</h2>
              <p className="text-[11px] text-indigo-400 font-medium">Control Center</p>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-4 space-y-1 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {active && <ChevronRight className="w-4 h-4 opacity-80" />}
              </Link>
            );
          })}
        </nav>

        {/* Quick Footer Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-xs font-medium text-slate-300 bg-slate-800/50 hover:bg-slate-800 hover:text-white transition-all"
          >
            <Globe className="w-4 h-4 text-emerald-400" />
            View Live Portfolio
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-slate-950 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
