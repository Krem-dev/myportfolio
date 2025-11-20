'use client';

import { useState } from 'react';
import { Mail, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

export default function ContactContent() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="h-full overflow-auto bg-gray-50">
      <div className="p-8">
        <div className="bg-white border border-gray-200 p-8 mb-6">
          <h1 className="text-3xl font-light text-gray-900 mb-1">Get In Touch</h1>
          <p className="text-lg text-gray-600">Let's work together</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 p-6">
            <h2 className="text-xl font-light text-gray-900 mb-4">Send a Message</h2>
            
            {submitted && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 mb-4 text-sm">
                Message sent successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-600 resize-none"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="bg-white border border-gray-200 p-6">
            <h2 className="text-xl font-light text-gray-900 mb-4">Contact Info</h2>
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <div className="text-xs text-gray-500 mb-1">Email</div>
                <div>john@example.com</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Location</div>
                <div>San Francisco, CA</div>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-500 mb-2">Social</div>
                <div className="space-y-2">
                  <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                    <Github size={16} />
                    <span>GitHub</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                    <Linkedin size={16} />
                    <span>LinkedIn</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                    <Twitter size={16} />
                    <span>Twitter</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
