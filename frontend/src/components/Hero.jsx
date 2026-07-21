import React from 'react';
import { ArrowRight, Download, Github, Linkedin, Sparkles, Terminal } from 'lucide-react';
import { resolveImageUrl } from '../services/api';

const Hero = ({ about }) => {
  const profile = about?.user || {};
  const headline = about?.headline || 'Full Stack Software Engineer & Cloud Architect';

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Decorative Glow Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md mb-8 text-xs font-semibold text-indigo-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Available for New Projects & Opportunities</span>
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
        </div>

        {/* Profile Image & Avatar */}
        {profile.avatar && (
          <div className="mb-6 flex justify-center">
            <div className="relative p-1 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-2xl shadow-indigo-500/30">
              <img
                src={resolveImageUrl(profile.avatar)}
                alt={profile.name || 'Developer Avatar'}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-slate-950"
              />
            </div>
          </div>
        )}

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6">
          Hi, I'm <span className="gradient-text">{profile.name || 'Mandy Developer'}</span>
        </h1>

        <p className="max-w-3xl mx-auto text-lg sm:text-xl font-medium text-slate-300 mb-8 leading-relaxed">
          {headline}
        </p>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 mb-10 leading-relaxed">
          {about?.bio || profile.bio || 'Crafting robust end-to-end web applications with modern architecture, intuitive UI design, and cloud deployments.'}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:shadow-xl hover:shadow-indigo-500/25 hover:-translate-y-0.5 transition-all"
          >
            Explore Projects
            <ArrowRight className="w-4 h-4" />
          </a>

          {about?.resumeUrl && (
            <a
              href={about.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 hover:bg-slate-800/80 transition-all"
            >
              <Download className="w-4 h-4 text-indigo-400" />
              Download CV
            </a>
          )}

          <a
            href="#contact"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-all"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            Contact Me
          </a>
        </div>

        {/* Social Icons */}
        <div className="mt-12 flex items-center justify-center gap-4">
          {profile.githubUrl && (
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 transition-all"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {profile.linkedinUrl && (
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
