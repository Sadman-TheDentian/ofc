
import React from 'react';
import Layout from '@/components/Layout';
import { Shield, Target, Zap, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="text-green-400">LeakScan</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            LeakScan is a comprehensive security assessment tool designed to help businesses 
            identify and address potential security vulnerabilities before they become threats.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Target className="h-8 w-8 text-green-400 mr-4" />
                <h2 className="text-3xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                In today's digital landscape, cybersecurity threats are constantly evolving. 
                Our mission is to democratize security assessments by providing businesses of all sizes 
                with instant, comprehensive domain security scans. We believe that proactive security 
                monitoring should be accessible, fast, and actionable.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Why Choose LeakScan?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gray-900 border-gray-800 hover:border-green-600/50 transition-colors">
              <CardContent className="p-6">
                <div className="bg-green-600/20 p-4 rounded-full inline-block mb-4">
                  <Zap className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Lightning Fast</h3>
                <p className="text-gray-400">
                  Get comprehensive security results in under 10 seconds. Our optimized scanning 
                  engine delivers instant insights without compromising accuracy.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover:border-green-600/50 transition-colors">
              <CardContent className="p-6">
                <div className="bg-blue-600/20 p-4 rounded-full inline-block mb-4">
                  <Shield className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Comprehensive Coverage</h3>
                <p className="text-gray-400">
                  We scan for email breaches, exposed admin panels, GitHub mentions, and provide 
                  overall risk assessments to give you a complete security picture.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover:border-green-600/50 transition-colors">
              <CardContent className="p-6">
                <div className="bg-purple-600/20 p-4 rounded-full inline-block mb-4">
                  <Users className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Privacy Focused</h3>
                <p className="text-gray-400">
                  We don't store or log your domain queries. Your security assessments remain 
                  private and confidential at all times.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technology Section */}
        <div className="mb-16">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">How It Works</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Real-Time Scanning</h3>
                  <p className="text-gray-300 mb-4">
                    Our scanning engine leverages multiple security databases and APIs to provide 
                    real-time assessments of your domain's security posture.
                  </p>
                  <ul className="text-gray-400 space-y-2">
                    <li>• HaveIBeenPwned breach database integration</li>
                    <li>• GitHub API for repository mentions</li>
                    <li>• Common admin panel detection</li>
                    <li>• Intelligent risk scoring algorithm</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Actionable Results</h3>
                  <p className="text-gray-300 mb-4">
                    We don't just identify problems - we provide clear, color-coded risk levels 
                    and actionable insights to help you improve your security posture.
                  </p>
                  <ul className="text-gray-400 space-y-2">
                    <li>• Color-coded risk assessment</li>
                    <li>• Detailed exposure metrics</li>
                    <li>• Clear vulnerability reporting</li>
                    <li>• Future PRO features roadmap</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Built by Security Experts</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            LeakScan is developed by the team at DentiSystems, specialists in cybersecurity 
            tools and digital risk assessment. We're committed to making enterprise-grade 
            security accessible to everyone.
          </p>
          <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg p-6 border border-green-600/30">
            <p className="text-green-400 font-semibold">
              Part of the DentiSystems security toolkit including DarkCheck, PhishRisk, and Password Leaker
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
