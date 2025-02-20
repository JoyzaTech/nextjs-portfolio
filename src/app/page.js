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
      className="absolute bg-gray-800/95 backdrop-blur-md rounded-lg shadow-2xl border border-gray-700 min-w-[240px]"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        zIndex: isDragging ? 10 : 1 
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="window-header bg-gray-800/80 p-2 rounded-t-lg cursor-move flex items-center">
        <div className="flex space-x-1.5 mr-3">
          <button 
            onClick={onClose}
            className="w-2.5 h-2.5 rounded-full bg-red-500 hover:bg-red-600"
          />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </div>
        <span className="text-gray-300 text-xs font-medium">{title}</span>
      </div>
      <div className="p-3 max-h-[400px] overflow-auto text-gray-200 text-sm">
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

  const skills = ["JavaScript", "React", "Next.js", "Node.js", "HTML/CSS", "Turbowarp"];
  
  const projects = [
    {
      title: "JoyzaOS",
      description: "A work in progress web-project that simplifies down the process of coding and makes it easier to create small apps and share them",
      tags: ["HTML", "JS"]
    },
    {
      title: "Moral Protocol",
      description: "FBLA Computer Game and Simulation winner.",
      tags: ["HTML", "JS"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 p-8">
      {/* Dock */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-800/40 backdrop-blur-md rounded-2xl border border-gray-700/50">
        <div className="flex space-x-3">
          <button 
            onClick={() => toggleWindow('about')}
            className="group flex flex-col items-center"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white transform group-hover:scale-110 transition-transform">
              👤
            </div>
          </button>

          <button 
            onClick={() => toggleWindow('skills')}
            className="group flex flex-col items-center"
          >
            <div className="w-10 h-10 bg-violet-500 rounded-lg flex items-center justify-center text-white transform group-hover:scale-110 transition-transform">
              💻
            </div>
          </button>

          <button 
            onClick={() => toggleWindow('projects')}
            className="group flex flex-col items-center"
          >
            <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center text-white transform group-hover:scale-110 transition-transform">
              🚀
            </div>
          </button>

          <button 
            onClick={() => toggleWindow('contact')}
            className="group flex flex-col items-center"
          >
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white transform group-hover:scale-110 transition-transform">
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
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-gray-100">Lucas Saner</h2>
          <h3 className="text-lg text-gray-300">Full Stack Developer and Game Designer</h3>
          <p className="text-gray-400 text-sm">
            I'm a passionate full-stack developer with 2 years of experience building web applications.
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
        <div className="flex flex-wrap gap-1.5">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 bg-blue-500/20 text-blue-200 rounded-full text-xs border border-blue-500/30"
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
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.title} className="border-b border-gray-700 pb-3 last:border-0">
              <h3 className="text-base font-semibold text-gray-200">{project.title}</h3>
              <p className="text-gray-400 mt-1 text-sm">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-gray-700 text-gray-300 rounded-full text-xs"
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
        <div className="space-y-3">
          <div>
            <h3 className="font-medium text-gray-200 text-sm">Email</h3>
            <a href="mailto:lucas.s.saner@gmail.com" className="text-blue-400 hover:text-blue-300 text-sm">
              lucas.s.saner@gmail.com
            </a>
          </div>
          <div>
            <h3 className="font-medium text-gray-200 text-sm">Social Links</h3>
            <div className="space-y-1">
              <a href="https://github.com/JoyzaTech" className="block text-blue-400 hover:text-blue-300 text-sm">GitHub</a>
            </div>
          </div>
        </div>
      </Window>
    </div>
  );
};

export default OSPortfolio;