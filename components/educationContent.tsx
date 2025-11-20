'use client';

import { GraduationCap, Calendar, Award } from 'lucide-react';

export default function EducationContent() {
  const education = [
    {
      id: 1,
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of California',
      location: 'Berkeley, CA',
      period: '2014 - 2018',
      gpa: '3.8/4.0',
      achievements: [
        'Dean\'s List all semesters',
        'Computer Science Department Award',
        'Senior Capstone Project: AI-powered chatbot',
      ],
    },
    {
      id: 2,
      degree: 'Full Stack Web Development Bootcamp',
      school: 'Tech Academy',
      location: 'Online',
      period: '2018',
      gpa: 'Certificate',
      achievements: [
        'Built 10+ full-stack applications',
        'Learned MERN stack',
        'Graduated top of class',
      ],
    },
  ];

  const certifications = [
    { name: 'AWS Certified Solutions Architect', year: '2023' },
    { name: 'MongoDB Certified Developer', year: '2022' },
    { name: 'Google Cloud Professional', year: '2021' },
  ];

  return (
    <div className="h-full overflow-auto bg-gray-50">
      <div className="p-8">
        <div className="bg-white border border-gray-200 p-8 mb-6">
          <h1 className="text-3xl font-light text-gray-900 mb-1">Education</h1>
          <p className="text-lg text-gray-600">Academic background & certifications</p>
        </div>

        <div className="space-y-6 mb-6">
          {education.map((edu) => (
            <div key={edu.id} className="bg-white border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-blue-600 font-medium mt-1">{edu.school}</p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 border border-blue-200 font-medium">
                  {edu.gpa}
                </span>
              </div>
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} className="text-gray-400" />
                  <span className="font-medium">{edu.period}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <GraduationCap size={16} className="text-gray-400" />
                  <span>{edu.location}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <ul className="space-y-2">
                  {edu.achievements.map((achievement, idx) => (
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

        <div className="bg-white border border-gray-200 p-6">
          <h2 className="text-xl font-light text-gray-900 mb-4">Certifications</h2>
          <div className="grid grid-cols-3 gap-4">
            {certifications.map((cert, idx) => (
              <div key={idx} className="border border-gray-200 p-4">
                <Award size={24} className="text-blue-600 mb-2" />
                <h3 className="text-sm font-medium text-gray-900 mb-1">{cert.name}</h3>
                <p className="text-xs text-gray-600">{cert.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
