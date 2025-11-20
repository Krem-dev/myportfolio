'use client';

import { ExternalLink, Github, Star } from 'lucide-react';

export default function ProjectsContent() {
  const projects = [
    {
      id: 1,
      name: 'E-Commerce Platform',
      description: 'A full-featured online shopping platform with payment integration, inventory management, and real-time order tracking.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: '🛒',
      stars: 124,
      link: '#',
      github: '#',
    },
    {
      id: 2,
      name: 'Task Management App',
      description: 'Real-time collaboration tool for teams with drag-and-drop interface, notifications, and project analytics.',
      tech: ['Next.js', 'WebSocket', 'PostgreSQL', 'Redis'],
      image: '📋',
      stars: 89,
      link: '#',
      github: '#',
    },
    {
      id: 3,
      name: 'Social Media Dashboard',
      description: 'Analytics dashboard for managing multiple social media accounts with automated posting and engagement tracking.',
      tech: ['Vue.js', 'Express', 'MySQL', 'Chart.js'],
      image: '📊',
      stars: 156,
      link: '#',
      github: '#',
    },
    {
      id: 4,
      name: 'Weather Forecast App',
      description: 'Beautiful weather application with 7-day forecasts, interactive maps, and severe weather alerts.',
      tech: ['React Native', 'Firebase', 'OpenWeather API'],
      image: '🌤️',
      stars: 67,
      link: '#',
      github: '#',
    },
  ];

  return (
    <div className="h-full overflow-auto bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <h1 className="text-2xl font-bold">My Projects</h1>
        <p className="text-blue-100 mt-1">A showcase of my recent work</p>
      </div>

      <div className="p-6 space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all"
          >
            <div className="flex">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-6xl flex-shrink-0">
                {project.image}
              </div>
              <div className="flex-1 p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 ml-4">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm font-medium text-gray-700">{project.stars}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-xs font-medium border border-blue-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 mt-4">
                  <a
                    href={project.link}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Github size={16} />
                    View Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
