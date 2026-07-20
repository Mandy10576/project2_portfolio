import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, Menu, X, Shield, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const isHomePage = location.pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-xl' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
              Dev<span className="text-indigo-500">Portfolio</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={isHomePage ? link.href : `/${link.href}`}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-full transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Admin CMS Access & Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all hover:-translate-y-0.5"
              >
                <Shield className="w-4 h-4" />
                CMS Dashboard
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-xl transition-all"
              >
                <Shield className="w-4 h-4 text-indigo-400" />
                Admin Portal
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 border-b border-slate-800 px-4 pt-3 pb-6 mt-3 space-y-3 backdrop-blur-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={isHomePage ? link.href : `/${link.href}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-800">
            <Link
              to={isAuthenticated ? "/admin/dashboard" : "/admin/login"}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl"
            >
              <Shield className="w-4 h-4" />
              {isAuthenticated ? "CMS Dashboard" : "Admin Login"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
