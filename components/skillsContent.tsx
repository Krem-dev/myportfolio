'use client';

export default function SkillsContent() {
  return (
    <div className="h-full overflow-auto bg-gray-50">
      <div className="p-8">
        <div className="bg-white border border-gray-200 p-8 mb-6">
          <h1 className="text-3xl font-light text-gray-900 mb-1">Technical Skills</h1>
          <p className="text-lg text-gray-600">Technologies and tools I work with</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 p-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Frontend</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div>React</div>
              <div>Next.js</div>
              <div>TypeScript</div>
              <div>Tailwind CSS</div>
              <div>Vue.js</div>
              <div>HTML/CSS</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Backend</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div>Node.js</div>
              <div>Express</div>
              <div>Python</div>
              <div>PostgreSQL</div>
              <div>MongoDB</div>
              <div>REST APIs</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Tools</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div>Git & GitHub</div>
              <div>Docker</div>
              <div>AWS</div>
              <div>CI/CD</div>
              <div>Linux</div>
              <div>Nginx</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Design</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div>Figma</div>
              <div>Adobe XD</div>
              <div>UI/UX</div>
              <div>Responsive Design</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Database</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div>PostgreSQL</div>
              <div>MongoDB</div>
              <div>Redis</div>
              <div>MySQL</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Other</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div>GraphQL</div>
              <div>WebSocket</div>
              <div>Testing</div>
              <div>Agile/Scrum</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
