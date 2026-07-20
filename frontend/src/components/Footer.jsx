import React from 'react';
import { Code2, Github, Linkedin, Twitter, Heart } from 'lucide-react';

const Footer = ({ about }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Dev<span className="text-indigo-500">Portfolio</span>
            </span>
          </div>

          <p className="text-sm text-slate-400 flex items-center gap-1">
            Built with <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> React, Express & PostgreSQL on AWS
          </p>

          <div className="flex items-center gap-4">
            <a
              href={about?.user?.githubUrl || "https://github.com"}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-900 rounded-lg transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={about?.user?.linkedinUrl || "https://linkedin.com"}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-900 rounded-lg transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={about?.user?.twitterUrl || "https://twitter.com"}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-900 rounded-lg transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-900 text-center text-xs text-slate-400">
          &copy; {new Date().getFullYear()} Alex Developer. All rights reserved. Powered by Admin CMS.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
