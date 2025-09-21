
import { Mail, MessageSquare, Globe, Shield } from 'lucide-react';

const Contact = () => {
  return (
    <div className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 neon-text">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about our security tools? Need help? We're here to assist you.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="cyber-card group hover:neon-glow transition-all duration-300">
            <Mail className="h-12 w-12 neon-text mb-4 group-hover:animate-pulse-neon" />
            <h3 className="text-xl font-semibold neon-text mb-3">Email Support</h3>
            <p className="text-muted-foreground mb-4">
              Send us an email and we'll get back to you within 24 hours.
            </p>
            <a 
              href="mailto:support@dentisystems.com" 
              className="cyber-button inline-block px-6 py-2 rounded-lg"
            >
              help@denti.systems
            </a>
          </div>

          <div className="cyber-card group hover:neon-glow transition-all duration-300">
            <MessageSquare className="h-12 w-12 neon-text mb-4 group-hover:animate-pulse-neon" />
            <h3 className="text-xl font-semibold neon-text mb-3">Community</h3>
            <p className="text-muted-foreground mb-4">
              Join our community discussions and get help from other users.
            </p>
            <button className="cyber-button px-6 py-2 rounded-lg">
              Join Discord
            </button>
          </div>
        </div>

        {/* Contact Form */}
        <div className="cyber-card max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold neon-text mb-6 text-center">Send us a Message</h2>
          
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 neon-text">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="cyber-input"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 neon-text">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="cyber-input"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2 neon-text">
                Subject
              </label>
              <select id="subject" className="cyber-input">
                <option value="">Select a topic</option>
                <option value="bug-report">Bug Report</option>
                <option value="feature-request">Feature Request</option>
                <option value="general-inquiry">General Inquiry</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 neon-text">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                className="cyber-input resize-none"
                placeholder="Tell us how we can help you..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full cyber-button py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
            >
              <Mail className="h-5 w-5" />
              <span>Send Message</span>
            </button>
          </form>
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div className="cyber-card">
            <Globe className="h-8 w-8 neon-text mb-4" />
            <h3 className="text-lg font-semibold neon-text mb-2">Global Presence</h3>
            <p className="text-muted-foreground">
              DentiSystems operates globally, providing 24/7 support to users worldwide across all time zones.
            </p>
          </div>

          <div className="cyber-card">
            <Shield className="h-8 w-8 neon-text mb-4" />
            <h3 className="text-lg font-semibold neon-text mb-2">Security First</h3>
            <p className="text-muted-foreground">
              All communications are encrypted and secure. We never store sensitive information unnecessarily.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
