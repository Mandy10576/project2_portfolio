/**
 * Database Seed Script
 * --------------------
 * Pre-populates the database with demo admin user and portfolio content.
 * Run using: `npm run seed`
 */
import bcrypt from 'bcryptjs';
import prisma from '../config/db.js';

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Create or Update Admin User
  const adminEmail = 'admin@example.com';
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Alex Developer',
      bio: 'Senior Full Stack Software Engineer specializing in React, Node.js, Express, and PostgreSQL.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      githubUrl: 'https://github.com',
      linkedinUrl: 'https://linkedin.com',
      twitterUrl: 'https://twitter.com',
    },
  });

  console.log(`✅ Admin Account Created/Verified: ${admin.email} (Password: admin123)`);

  // 2. Seed About Section
  const existingAbout = await prisma.about.findFirst();
  if (!existingAbout) {
    await prisma.about.create({
      data: {
        headline: 'Full Stack Software Engineer & Cloud Architect',
        bio: 'I build high-performance, accessible, and scalable web applications. Passionate about clean architecture, microservices, and elegant UI/UX experiences.',
        experienceYears: 4,
        completedProjects: 20,
        clientsCount: 12,
        location: 'San Francisco, CA',
        email: 'alex@example.com',
        phone: '+1 (555) 019-2834',
        resumeUrl: 'https://example.com/resume.pdf',
      },
    });
    console.log('✅ About Section Seeded');
  }

  // 3. Seed Skills
  const existingSkills = await prisma.skill.count();
  if (existingSkills === 0) {
    await prisma.skill.createMany({
      data: [
        { name: 'React.js', category: 'Frontend', proficiency: 95, icon: 'code' },
        { name: 'JavaScript / ES6+', category: 'Frontend', proficiency: 90, icon: 'terminal' },
        { name: 'Tailwind CSS', category: 'Frontend', proficiency: 92, icon: 'layout' },
        { name: 'TypeScript', category: 'Frontend', proficiency: 85, icon: 'file-code' },
        { name: 'Node.js', category: 'Backend', proficiency: 90, icon: 'server' },
        { name: 'Express.js', category: 'Backend', proficiency: 92, icon: 'cpu' },
        { name: 'PostgreSQL', category: 'Database', proficiency: 88, icon: 'database' },
        { name: 'Prisma ORM', category: 'Database', proficiency: 90, icon: 'layers' },
        { name: 'AWS (EC2 & RDS)', category: 'DevOps', proficiency: 80, icon: 'cloud' },
        { name: 'Docker & Git', category: 'DevOps', proficiency: 85, icon: 'git-branch' },
      ],
    });
    console.log('✅ Skills Seeded');
  }

  // 4. Seed Experiences
  const existingExp = await prisma.experience.count();
  if (existingExp === 0) {
    await prisma.experience.createMany({
      data: [
        {
          role: 'Senior Full Stack Developer',
          company: 'TechCorp Solutions',
          location: 'San Francisco, CA (Remote)',
          startDate: 'Jan 2024',
          endDate: 'Present',
          current: true,
          description: 'Architected modern SaaS web platforms using React, Express, Node.js, and PostgreSQL on AWS EC2. Reduced API latencies by 40%.',
        },
        {
          role: 'Full Stack Software Developer',
          company: 'CloudCraft Labs',
          location: 'Austin, TX',
          startDate: 'Jun 2022',
          endDate: 'Dec 2023',
          current: false,
          description: 'Developed RESTful microservices, integrated JWT auth systems, and built admin CMS dashboards for enterprise clients.',
        },
        {
          role: 'Frontend Developer Intern',
          company: 'Innovate Web Agency',
          location: 'Seattle, WA',
          startDate: 'Jan 2022',
          endDate: 'May 2022',
          current: false,
          description: 'Crafted interactive user interfaces with React, Tailwind CSS, and optimized core web vitals for customer landing pages.',
        },
      ],
    });
    console.log('✅ Experiences Seeded');
  }

  // 5. Seed Projects
  const existingProjects = await prisma.project.count();
  if (existingProjects === 0) {
    await prisma.project.createMany({
      data: [
        {
          title: 'E-Commerce Cloud Platform',
          description: 'A scalable full-stack online marketplace with real-time inventory management, payment gateway integration, and admin dashboard analytics.',
          technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
          githubUrl: 'https://github.com/example/ecommerce-cloud',
          liveDemoUrl: 'https://example-ecommerce.vercel.app',
          image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80',
          featured: true,
          createdDate: new Date('2024-03-15'),
        },
        {
          title: 'AI Content Management System',
          description: 'Custom CMS dashboard empowering creators to generate blog posts, manage portfolio assets, and track audience engagement metrics.',
          technologies: ['React', 'Vite', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
          githubUrl: 'https://github.com/example/ai-cms',
          liveDemoUrl: 'https://example-cms.vercel.app',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
          featured: true,
          createdDate: new Date('2024-01-20'),
        },
        {
          title: 'Task Orchestration & Dev Dashboard',
          description: 'Real-time kanban and workflow automation software built for developer teams to monitor CI/CD pipelines and sprint velocity.',
          technologies: ['React', 'Tailwind CSS', 'Express', 'Prisma', 'PostgreSQL'],
          githubUrl: 'https://github.com/example/dev-orchestrator',
          liveDemoUrl: 'https://example-orchestrator.vercel.app',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
          featured: false,
          createdDate: new Date('2023-11-10'),
        },
      ],
    });
    console.log('✅ Projects Seeded');
  }

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
