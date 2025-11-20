'use client';

import { MapPin, Mail, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';

export default function AboutContent() {
  return (
    <div className="h-full overflow-auto bg-gray-50">
      <div className="p-8">
        <div className="bg-white border border-gray-200 p-8 mb-6">
          <h1 className="text-3xl font-light text-gray-900 mb-1">John Doe</h1>
          <p className="text-lg text-gray-600 mb-4">Full Stack Developer</p>
          <div className="flex flex-wrap gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <MapPin size={16} />
              San Francisco, CA
            </span>
            <span className="flex items-center gap-2">
              <Mail size={16} />
              john@example.com
            </span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-light text-gray-900 mb-4">About</h2>
          <p className="text-gray-700 leading-relaxed">
            Full-stack developer with 5+ years building web applications. Specialized in React, Node.js, 
            and cloud technologies. Focused on creating scalable solutions and great user experiences.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white border border-gray-200 p-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Frontend</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div>React & Next.js</div>
              <div>TypeScript</div>
              <div>Tailwind CSS</div>
              <div>Vue.js</div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Backend</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div>Node.js & Express</div>
              <div>PostgreSQL</div>
              <div>MongoDB</div>
              <div>Redis</div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Tools</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div>Git & GitHub</div>
              <div>Docker</div>
              <div>AWS</div>
              <div>CI/CD</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-light text-gray-900 mb-4">Connect</h2>
          <div className="flex flex-wrap gap-3">
            <a href="#" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors">
              <Github size={18} />
              GitHub
            </a>
            <a href="#" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              <Linkedin size={18} />
              LinkedIn
            </a>
            <a href="#" className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500 text-white hover:bg-sky-600 transition-colors">
              <Twitter size={18} />
              Twitter
            </a>
            <a href="#" className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
              <ExternalLink size={18} />
              Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
