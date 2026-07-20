import React from 'react';
import { Briefcase, Calendar, MapPin, Building2 } from 'lucide-react';

const ExperienceSection = ({ experiences = [] }) => {
  return (
    <section id="experience" className="py-24 bg-slate-950 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">
            Career Journey
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">
            Experience & Education
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-indigo-500/30 ml-4 md:ml-32 space-y-12">
          {experiences.map((item, idx) => (
            <div key={item.id || idx} className="relative pl-8 md:pl-10">
              {/* Timeline Dot */}
              <div className="absolute -left-[17px] top-1.5 p-1.5 rounded-full bg-slate-950 border-2 border-indigo-500 text-indigo-400">
                <Briefcase className="w-4 h-4" />
              </div>

              {/* Date Column (Desktop side) */}
              <div className="hidden md:block absolute -left-36 top-1 text-right w-28 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                {item.startDate} — {item.current ? 'Present' : item.endDate}
              </div>

              {/* Card Content */}
              <div className="p-6 rounded-2xl glass-card border border-slate-800/80">
                <div className="md:hidden inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.startDate} — {item.current ? 'Present' : item.endDate}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">{item.role}</h3>
                    <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold mt-1">
                      <Building2 className="w-4 h-4" />
                      <span>{item.company}</span>
                    </div>
                  </div>
                  {item.location && (
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
