import React, { useState } from 'react';
import { ExternalLink, Github, Star, Calendar, Code2 } from 'lucide-react';
import { resolveImageUrl } from '../services/api';

const ProjectsSection = ({ projects = [] }) => {
  const [filter, setFilter] = useState('all');

  const filteredProjects =
    filter === 'featured'
      ? projects.filter((p) => p.featured)
      : projects;

  return (
    <section id="projects" className="py-24 bg-slate-950/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">
              Portfolio Portfolio
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white">
              Featured Work & Case Studies
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 self-start">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                filter === 'all'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Projects ({projects.length})
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                filter === 'featured'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              Featured Only
            </button>
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl glass-card overflow-hidden border border-slate-800 flex flex-col h-full"
            >
              {/* Image Preview */}
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                <img
                  src={resolveImageUrl(project.image)}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {project.featured && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-500/90 text-slate-950 font-bold text-xs flex items-center gap-1 backdrop-blur-md shadow-md">
                    <Star className="w-3 h-3 fill-slate-950 text-slate-950" />
                    Featured
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Created Date */}
                  {project.createdDate && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-2">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      {new Date(project.createdDate).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-slate-300 mb-6 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies?.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-medium text-indigo-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Code Repository
                      </a>
                    ) : (
                      <span />
                    )}

                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                      >
                        Live Demo
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
