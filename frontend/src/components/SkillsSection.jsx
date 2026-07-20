import React, { useState } from 'react';
import { Cpu, Code, Database, Layers, Terminal } from 'lucide-react';

const SkillsSection = ({ skills = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Categories extraction
  const categories = ['All', ...Array.from(new Set(skills.map((s) => s.category)))];

  const filteredSkills =
    selectedCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">
            Technical Expertise
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">
            Skills & Technologies
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-6 rounded-2xl glass-card border border-slate-800/80 hover:border-indigo-500/30"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                    <Code className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">{skill.name}</h3>
                    <span className="text-xs text-slate-400">{skill.category}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-indigo-400">{skill.proficiency}%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
