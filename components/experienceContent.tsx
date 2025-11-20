'use client';

import { Briefcase, Calendar, MapPin } from 'lucide-react';

export default function ExperienceContent() {
  const experiences = [
    {
      id: 1,
      company: 'Tech Company Inc.',
      position: 'Senior Full Stack Developer',
      location: 'San Francisco, CA',
      period: '2022 - Present',
      description: 'Leading development of enterprise web applications using React and Node.js. Mentoring junior developers and implementing best practices.',
      achievements: [
        'Improved application performance by 40%',
        'Led migration to microservices architecture',
        'Implemented CI/CD pipeline reducing deployment time by 60%',
      ],
      current: true,
    },
    {
      id: 2,
      company: 'Digital Solutions Ltd.',
      position: 'Full Stack Developer',
      location: 'New York, NY',
      period: '2020 - 2022',
      description: 'Developed and maintained multiple client projects using modern web technologies. Collaborated with design team to create responsive interfaces.',
      achievements: [
        'Built 15+ client websites and applications',
        'Reduced bug reports by 35% through comprehensive testing',
        'Introduced TypeScript to the development workflow',
      ],
      current: false,
    },
    {
      id: 3,
      company: 'StartUp Ventures',
      position: 'Junior Developer',
      location: 'Austin, TX',
      period: '2018 - 2020',
      description: 'Started career building web applications and learning modern development practices. Worked on both frontend and backend features.',
      achievements: [
        'Contributed to 3 major product releases',
        'Learned React, Node.js, and database management',
        'Participated in agile development processes',
      ],
      current: false,
    },
  ];

  return (
    <div className="h-full overflow-auto bg-gray-50">
      <div className="p-8">
        <div className="bg-white border border-gray-200 p-8 mb-6">
          <h1 className="text-3xl font-light text-gray-900 mb-1">Work Experience</h1>
          <p className="text-lg text-gray-600">Professional background</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {experiences.map((exp) => (
            <div key={exp.id} className="bg-white border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                  <p className="text-blue-600 font-medium mt-1">{exp.company}</p>
                </div>
                {exp.current && (
                  <span className="text-xs bg-green-500 text-white px-2 py-1 font-medium">
                    NOW
                  </span>
                )}
              </div>
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} className="text-gray-400" />
                  <span className="font-medium">{exp.period}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={16} className="text-gray-400" />
                  <span>{exp.location}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
