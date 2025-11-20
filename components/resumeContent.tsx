'use client';

import { Download, FileText, Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function ResumeContent() {
  return (
    <div className="h-full overflow-auto bg-white">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Resume</h1>
          <p className="text-blue-100 mt-1">Professional CV</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
          <Download size={18} />
          Download PDF
        </button>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mb-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Your Name</h2>
            <p className="text-xl text-gray-600 mt-2">Full Stack Developer</p>
          </div>
          
          <div className="flex justify-center gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <Mail size={16} />
              your.email@example.com
            </span>
            <span className="flex items-center gap-2">
              <Phone size={16} />
              +1 (555) 123-4567
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={16} />
              Your City, Country
            </span>
            <span className="flex items-center gap-2">
              <Globe size={16} />
              yourwebsite.com
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2 mb-4">
              Professional Summary
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Experienced Full Stack Developer with 5+ years of expertise in building scalable web applications.
              Proficient in React, Node.js, and cloud technologies. Strong problem-solving skills and passion
              for creating efficient, user-friendly solutions.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2 mb-4">
              Work Experience
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-gray-800">Senior Full Stack Developer</h4>
                    <p className="text-blue-600">Tech Company Inc.</p>
                  </div>
                  <span className="text-sm text-gray-600">2022 - Present</span>
                </div>
                <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                  <li>Led development of enterprise applications serving 100K+ users</li>
                  <li>Improved application performance by 40% through optimization</li>
                  <li>Mentored team of 5 junior developers</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-gray-800">Full Stack Developer</h4>
                    <p className="text-blue-600">Digital Solutions Ltd.</p>
                  </div>
                  <span className="text-sm text-gray-600">2020 - 2022</span>
                </div>
                <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                  <li>Developed 15+ client websites and web applications</li>
                  <li>Implemented responsive designs and modern UI frameworks</li>
                  <li>Reduced bug reports by 35% through comprehensive testing</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2 mb-4">
              Education
            </h3>
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-gray-800">Bachelor of Science in Computer Science</h4>
                  <p className="text-blue-600">University Name</p>
                </div>
                <span className="text-sm text-gray-600">2014 - 2018</span>
              </div>
              <p className="text-gray-700 text-sm">GPA: 3.8/4.0</p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2 mb-4">
              Technical Skills
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Frontend</h4>
                <p className="text-sm text-gray-700">React, Next.js, TypeScript, TailwindCSS, Vue.js</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Backend</h4>
                <p className="text-sm text-gray-700">Node.js, Express, Python, PostgreSQL, MongoDB</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">DevOps</h4>
                <p className="text-sm text-gray-700">Docker, AWS, Git, CI/CD, Linux</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Tools</h4>
                <p className="text-sm text-gray-700">VS Code, Figma, Postman, Jira</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2 mb-4">
              Certifications
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <FileText size={16} className="mt-1 text-blue-600" />
                <span className="text-sm">AWS Certified Solutions Architect</span>
              </li>
              <li className="flex items-start gap-2">
                <FileText size={16} className="mt-1 text-blue-600" />
                <span className="text-sm">MongoDB Certified Developer</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
