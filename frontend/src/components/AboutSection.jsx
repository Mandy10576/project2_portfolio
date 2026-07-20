import React from 'react';
import { Award, CheckCircle2, FolderGit2, MapPin, Users, Mail, Phone } from 'lucide-react';

const AboutSection = ({ about }) => {
  const stats = [
    { label: 'Years Experience', value: `${about?.experienceYears || 3}+`, icon: Award },
    { label: 'Projects Completed', value: `${about?.completedProjects || 15}+`, icon: FolderGit2 },
    { label: 'Happy Clients', value: `${about?.clientsCount || 10}+`, icon: Users },
  ];

  return (
    <section id="about" className="py-24 bg-slate-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">About Me</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">
            Engineering Web Solutions with Precision & Passion
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Stats Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl glass-card flex items-center gap-5 border border-slate-800"
                >
                  <div className="p-3.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-extrabold text-white">{stat.value}</h3>
                    <p className="text-sm text-slate-400">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bio Description & Details */}
          <div className="lg:col-span-7 bg-slate-900/40 p-8 rounded-3xl border border-slate-800/80 backdrop-blur-md">
            <h3 className="text-2xl font-bold text-white mb-4">
              {about?.headline || 'Full Stack Engineer'}
            </h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              {about?.bio ||
                'I am a full stack web developer focused on building clean, efficient, and user-friendly web interfaces backed by robust database architectures and REST API microservices.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-sm">
              {about?.location && (
                <div className="flex items-center gap-3 text-slate-300">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  <span>{about.location}</span>
                </div>
              )}
              {about?.email && (
                <div className="flex items-center gap-3 text-slate-300">
                  <Mail className="w-4 h-4 text-indigo-400" />
                  <span>{about.email}</span>
                </div>
              )}
              {about?.phone && (
                <div className="flex items-center gap-3 text-slate-300">
                  <Phone className="w-4 h-4 text-indigo-400" />
                  <span>{about.phone}</span>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Full Stack React & Node Development',
                'PostgreSQL & Prisma Database Modeling',
                'REST APIs & JWT Protected Middleware',
                'AWS RDS & EC2 Deployment Ready',
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2.5 text-xs font-semibold text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
