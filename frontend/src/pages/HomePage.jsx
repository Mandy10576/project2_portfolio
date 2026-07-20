import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ExperienceSection from '../components/ExperienceSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import api from '../services/api';

const HomePage = () => {
  const [about, setAbout] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        const [aboutRes, skillRes, projectRes, expRes] = await Promise.all([
          api.get('/about').catch(() => null),
          api.get('/skills').catch(() => null),
          api.get('/projects').catch(() => null),
          api.get('/experiences').catch(() => null),
        ]);

        if (aboutRes?.data?.data?.about) setAbout(aboutRes.data.data.about);
        if (skillRes?.data?.data?.skills) setSkills(skillRes.data.data.skills);
        if (projectRes?.data?.data?.projects) setProjects(projectRes.data.data.projects);
        if (expRes?.data?.data?.experiences) setExperiences(expRes.data.data.experiences);
      } catch (error) {
        console.error('Error loading portfolio data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-indigo-400 gap-4">
        <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-slate-400">Loading Portfolio Experience...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <main>
        <Hero about={about} />
        <AboutSection about={about} />
        <SkillsSection skills={skills} />
        <ProjectsSection projects={projects} />
        <ExperienceSection experiences={experiences} />
        <ContactSection about={about} />
      </main>
      <Footer about={about} />
    </div>
  );
};

export default HomePage;
