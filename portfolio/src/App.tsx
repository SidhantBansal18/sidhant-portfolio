
import React from 'react';
import * as Lucide from 'lucide-react';

const ProfileData = {
  name: "Sidhant Bansal",
  role: "Software Developer",
  valueProp: "Specializing in high-performance data engineering and full-stack application development. Expertise in optimizing large-scale simulation systems and incident management platforms.",
  status: "Open to Entry & Mid-Level Software Engineering Roles",
  skills: {
    languages: [
      { name: "C#", icon: <Lucide.Code size={18} /> },
      { name: "Python", icon: <Lucide.Code size={18} /> },
      { name: "SQL", icon: <Lucide.Database size={18} /> },
    ],
    frameworks: [
      { name: "ASP.NET", icon: <Lucide.Terminal size={18} /> },
      { name: "Polars", icon: <Lucide.Cpu size={18} /> },
      { name: "SQLAlchemy", icon: <Lucide.Database size={18} /> },
      { name: "Numba", icon: <Lucide.Cpu size={18} /> },
    ],
    tools: [
      { name: "Azure DevOps", icon: <Lucide.Terminal size={18} /> },
      { name: "ArcGIS", icon: <Lucide.ExternalLink size={18} /> },
      { name: "GitHub Copilot", icon: <Lucide.Code size={18} /> },
    ],
    databases: [
      { name: "SQL Server", icon: <Lucide.Database size={18} /> },
    ],
  },
  experience: [
    {
      organization: "Washington State Department of Ecology",
      role: "Software Developer / Data Engineer",
      period: "Present",
      projects: [
        {
          name: "Maritime Risk Model",
          description: "High-performance vessel drift and tug escort analysis system.",
          highlights: [
            "Architected ETL pipelines processing millions of rows of vessel and weather data.",
            "Optimized retrieval time by converting 500M+ rows of weather data into 3D matrices for O(1) in-memory lookup.",
            "Utilized Polars and Numba to accelerate computationally expensive simulations.",
            "Developed spatial analysis logic to identify vessel 'laden' and 'escort' status using speed/distance thresholds."
          ],
          tech: ["Python", "Polars", "Numba", "SQLAlchemy", "ArcGIS"]
        },
        {
          name: "SPIIS (Spills Program Incident Information System)",
          description: "Core application for environmental incident management.",
          highlights: [
            "Enhanced database layer by implementing one-to-many relationships and optimized stored procedures.",
            "Reduced incident response times by streamlining critical application paths.",
            "Collaborated with stakeholders to translate complex environmental requirements into technical specifications."
          ],
          tech: ["ASP.NET", "C#", "SQL Server", "Azure DevOps"]
        }
      ]
    }
  ],
  contact: {
    email: "your-email@example.com",
    github: "https://github.com/your-github",
    linkedin: "https://linkedin.com/in/your-linkedin",
  }
};

const Section = ({ title, children, id }) => (
  <section id={id} className="py-20 px-6 max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold mb-12 text-white flex items-center gap-3">
      <div className="h-8 w-1 bg-electric-cyan rounded-full" />
      {title}
    </h2>
    {children}
  </section>
);

const Hero = () => (
  <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-slate to-zinc-deep opacity-50" />
    <div className="absolute -top-24 -left-24 w-96 h-96 bg-electric-cyan/10 rounded-full blur-3xl" />
    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-accent/10 rounded-full blur-3xl" />
    
    <div className="relative z-10 text-center max-w-3xl">
      <div className="inline-block px-3 py-1 rounded-full bg-electric-cyan/10 border border-electric-cyan/20 text-electric-cyan text-xs font-medium mb-6 animate-fade-in">
        {ProfileData.status}
      </div>
      <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-6 tracking-tight">
        {ProfileData.name}
      </h1>
      <p className="text-xl md:text-2xl text-slate-400 mb-10 leading-relaxed">
        {ProfileData.valueProp}
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <a href="#experience" className="px-8 py-3 bg-electric-cyan text-zinc-deep font-bold rounded-lg hover:bg-white transition-colors duration-300">
          View Experience
        </a>
        <a href={`mailto:${ProfileData.contact.email}`} className="px-8 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm">
          Contact Me
        </a>
      </div>
    </div>
  </div>
);

const Skills = () => (
  <Section title="Technical Arsenal" id="skills">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Object.entries(ProfileData.skills).map(([category, items]) => (
        <div key={category} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-electric-cyan/30 transition-all duration-300 group">
          <h3 className="text-lg font-semibold text-slate-300 mb-4 capitalize">{category}</h3>
          <div className="flex flex-wrap gap-3">
            {items.map((item, i) => (
              <div key={`${category}-${i}`} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-deep border border-white/5 text-slate-400 text-sm group-hover:text-electric-cyan transition-colors">
                {item.icon}
                {item.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </Section>
);

const Experience = () => (
  <Section title="Professional Journey" id="experience">
    <div className="space-y-12">
      {ProfileData.experience.map((exp, i) => (
        <div key={i} className="relative pl-8 border-l-2 border-white/10">
          <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-electric-cyan shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
            <div>
              <h3 className="text-2xl font-bold text-white">{exp.organization}</h3>
              <p className="text-electric-cyan font-medium">{exp.role}</p>
            </div>
            <span className="text-slate-500 font-mono text-sm">{exp.period}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
            {exp.projects.map((proj, j) => (
              <div key={j} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-accent/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold text-white">{proj.name}</h4>
                  <div className="flex gap-2">
                    {proj.tech.map((t, idx) => (
                      <span key={idx} className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-accent/10 text-emerald-accent border border-emerald-accent/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-slate-400 text-sm mb-4">{proj.description}</p>
                <ul className="space-y-3">
                  {proj.highlights.map((h, k) => (
                    <li key={k} className="text-slate-300 text-sm flex items-start gap-3">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-electric-cyan shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </Section>
);

const Contact = () => {
  // Fallback components in case Lucide imports fail
  const GithubIcon = Lucide.Github || (() => <span>GH</span>);
  const LinkedinIcon = Lucide.Linkedin || (() => <span>LN</span>);
  const MailIcon = Lucide.Mail || (() => <span>M</span>);

  return (
    <Section title="Get In Touch" id="contact">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-slate-400 mb-10">
          I am currently seeking new opportunities. Whether you have a question or just want to say hi, my inbox is always open!
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <a href={ProfileData.contact.github} target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-electric-cyan hover:text-zinc-deep transition-all duration-300 group">
            <GithubIcon size={24} />
          </a>
          <a href={ProfileData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-electric-cyan hover:text-zinc-deep transition-all duration-300 group">
            <LinkedinIcon size={24} />
          </a>
          <a href={`mailto:${ProfileData.contact.email}`} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-electric-cyan hover:text-zinc-deep transition-all duration-300 group">
            <MailIcon size={24} />
          </a>
        </div>
      </div>
    </Section>
  );
};

const Footer = () => (
  <footer className="py-10 text-center text-slate-500 text-sm border-t border-white/10">
    <p>© {new Date().getFullYear()} {ProfileData.name}. Built with React, Tailwind, and Vite.</p>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-deep text-slate-200 selection:bg-electric-cyan selection:text-zinc-deep">
      <Hero />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}
