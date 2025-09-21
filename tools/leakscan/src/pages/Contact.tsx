
import React, { useState } from 'react';
import { Mail, MessageSquare, Shield, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import NeonHeader from '@/components/NeonHeader';
import NeonFooter from '@/components/NeonFooter';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-cyber-bg text-white flex flex-col">
    <NeonHeader />
    <main className="flex-grow container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Contact <span className="text-green-400">Us</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Have questions about LeakScan or need help with your security assessment? 
          We're here to help secure your digital presence.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center mb-6">
              <MessageSquare className="h-6 w-6 text-green-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Send us a Message</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Tell us how we can help..."
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="space-y-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Mail className="h-6 w-6 text-green-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">Get in Touch</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Ready to enhance your cybersecurity posture? Reach out to our team for 
                questions, feedback, or enterprise solutions.
              </p>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white ml-2">security@denti.systems</span>
                </div>
                <div>
                  <span className="text-gray-400">Response Time:</span>
                  <span className="text-white ml-2">Within 24 hours</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-green-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">Enterprise Solutions</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Need custom security assessments or enterprise-grade monitoring? 
                Let's discuss how we can protect your organization.
              </p>
              <ul className="text-gray-400 space-y-2">
                <li>• Custom security assessments</li>
                <li>• Automated monitoring solutions</li>
                <li>• API integrations</li>
                <li>• Dedicated support</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border-green-600/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Stay Updated</h3>
              <p className="text-gray-300 mb-4">
                Follow our development and get notified about new security tools and features.
              </p>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => window.open('https://denti.systems', '_blank')}
              >
                Visit DentiSystems
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
      <NeonFooter />
    </div>
  );
};

export default Contact;
