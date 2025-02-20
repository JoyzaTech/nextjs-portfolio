"use client"

import React, { useState } from 'react';

const Window = ({ title, isOpen, onClose, initialPosition, children }) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.target.classList.contains('window-header')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="absolute bg-gray-800/95 backdrop-blur-md rounded-lg shadow-2xl border border-gray-700 min-w-[300px]"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        zIndex: isDragging ? 10 : 1 
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="window-header bg-gray-800/80 p-3 rounded-t-lg cursor-move flex items-center">
        <div className="flex space-x-2 mr-4">
          <button 
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600"
          />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-gray-300 text-sm font-medium">{title}</span>
      </div>
      <div className="p-4 max-h-[500px] overflow-auto text-gray-200">
        {children}
      </div>
    </div>
  );
};

const OSPortfolio = () => {
  const [windows, setWindows] = useState({
    about: false,
    skills: false,
    projects: false,
    contact: false,
  });

  const initialPositions = {
    about: { x: 100, y: 100 },
    skills: { x: 150, y: 150 },
    projects: { x: 200, y: 200 },
    contact: { x: 250, y: 250 },
  };

  const toggleWindow = (window) => {
    setWindows(prev => ({
      ...prev,
      [window]: !prev[window]
    }));
  };

  const skills = ["JavaScript", "React", "Next.js", "Node.js", "HTML/CSS", "Git", "TypeScript", "Tailwind CSS"];
  
  const projects = [
    {
      title: "Project One",
      description: "A full-stack web application built with React and Node.js",
      tags: ["React", "Node.js", "MongoDB"]
    },
    {
      title: "Project Two",
      description: "Mobile-first responsive website for a local business",
      tags: ["Next.js", "Tailwind CSS", "Vercel"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 p-8">
      {/* Dock */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-gray-800/40 backdrop-blur-md rounded-2xl border border-gray-700/50">
        <div className="flex space-x-4">
          <button 
            onClick={() => toggleWindow('about')}
            className="group flex flex-col items-center"
          >
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white mb-1 transform group-hover:scale-110 transition-transform">
              👤
            </div>
          </button>

          <button 
            onClick={() => toggleWindow('skills')}
            className="group flex flex-col items-center"
          >
            <div className="w-12 h-12 bg-violet-500 rounded-xl flex items-center justify-center text-white mb-1 transform group-hover:scale-110 transition-transform">
              💻
            </div>
          </button>

          <button 
            onClick={() => toggleWindow('projects')}
            className="group flex flex-col items-center"
          >
            <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center text-white mb-1 transform group-hover:scale-110 transition-transform">
              🚀
            </div>
          </button>

          <button 
            onClick={() => toggleWindow('contact')}
            className="group flex flex-col items-center"
          >
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white mb-1 transform group-hover:scale-110 transition-transform">
              ✉️
            </div>
          </button>
        </div>
      </div>

      {/* Windows */}
      <Window 
        title="About Me" 
        isOpen={windows.about} 
        onClose={() => toggleWindow('about')}
        initialPosition={initialPositions.about}
      >
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-100">John Doe</h2>
          <h3 className="text-xl text-gray-300">Full Stack Developer</h3>
          <p className="text-gray-400">
            I'm a passionate full-stack developer with 5 years of experience building web applications.
            I specialize in creating responsive, user-friendly interfaces and robust backend systems.
          </p>
        </div>
      </Window>

      <Window 
        title="Skills" 
        isOpen={windows.skills} 
        onClose={() => toggleWindow('skills')}
        initialPosition={initialPositions.skills}
      >
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full text-sm border border-blue-500/30"
            >
              {skill}
            </span>
          ))}
        </div>
      </Window>

      <Window 
        title="Projects" 
        isOpen={windows.projects} 
        onClose={() => toggleWindow('projects')}
        initialPosition={initialPositions.projects}
      >
        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.title} className="border-b border-gray-700 pb-4 last:border-0">
              <h3 className="text-lg font-semibold text-gray-200">{project.title}</h3>
              <p className="text-gray-400 mt-1">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Window>

      <Window 
        title="Contact" 
        isOpen={windows.contact} 
        onClose={() => toggleWindow('contact')}
        initialPosition={initialPositions.contact}
      >
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-200">Email</h3>
            <a href="mailto:john@example.com" className="text-blue-400 hover:text-blue-300">
              john@example.com
            </a>
          </div>
          <div>
            <h3 className="font-medium text-gray-200">Social Links</h3>
            <div className="space-y-2">
              <a href="https://github.com" className="block text-blue-400 hover:text-blue-300">GitHub</a>
              <a href="https://linkedin.com" className="block text-blue-400 hover:text-blue-300">LinkedIn</a>
            </div>
          </div>
        </div>
      </Window>
    </div>
  );
};

export default OSPortfolio;