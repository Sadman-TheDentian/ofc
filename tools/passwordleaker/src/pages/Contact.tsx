
import React, { useState } from 'react';
import { Mail, MessageSquare, Shield, ExternalLink } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Get in <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">Touch</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Have questions about Password Leaker? Want to report a bug or request a feature? We'd love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-gray-800 border border-green-500/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-green-400" />
            Send us a Message
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none"
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="bug">Bug Report</option>
                <option value="feature">Feature Request</option>
                <option value="pro">PRO Features</option>
                <option value="enterprise">Enterprise Solutions</option>
                <option value="privacy">Privacy & Security</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none resize-none"
                placeholder="Tell us how we can help you..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Mail className="h-5 w-5" />
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          {/* Quick Links */}
          <div className="bg-gray-800 border border-green-500/20 rounded-xl p-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Shield className="h-6 w-6 text-green-400" />
              Quick Links
            </h3>
            <div className="space-y-4">
              <a
                href="https://denti.systems"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
              >
                DentiSystems Main Site
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="https://darkcheck.denti.systems"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
              >
                DarkCheck - Dark Web Monitoring
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="https://phishrisk.denti.systems"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
              >
                PhishRisk - Phishing Detection
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-gray-800 border border-green-500/20 rounded-xl p-8">
            <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-400 mb-1">Is my password stored or logged?</h4>
                <p className="text-gray-400 text-sm">No, your password is never sent to our servers. We use k-anonymity to protect your privacy.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-green-400 mb-1">How accurate is the breach data?</h4>
                <p className="text-gray-400 text-sm">We use the HaveIBeenPwned database, which is the industry standard for breach detection.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-green-400 mb-1">When will PRO features be available?</h4>
                <p className="text-gray-400 text-sm">PRO features are coming soon. Join our waitlist to be notified when they launch.</p>
              </div>
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-gray-800 border border-green-500/20 rounded-xl p-8">
            <h3 className="text-xl font-bold mb-4">Response Times</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">General Inquiries</span>
                <span className="text-green-400">24-48 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Bug Reports</span>
                <span className="text-green-400">12-24 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Enterprise</span>
                <span className="text-green-400">Same day</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
