
import React from 'react';
import DomainScanner from '@/components/DomainScanner';
import { Shield, Search, AlertTriangle, Github, Lock, Server, Globe, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import NeonHeader from '@/components/NeonHeader';
import NeonFooter from '@/components/NeonFooter';

const Index = () => {
  return (
    <div className="min-h-screen bg-cyber-bg text-white flex flex-col">
      <NeonHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-green-600/20 p-6 rounded-full">
              <Shield className="h-16 w-16 text-green-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Leak<span className="text-green-400">Scan</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Comprehensive security analysis for any domain. Get detailed insights into vulnerabilities, 
            exposed credentials, SSL certificates, and security headers in under 15 seconds.
          </p>
        </div>

        {/* Scanner Component */}
        <DomainScanner />

        {/* Enhanced Features Section */}
        <div className="mt-16 mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Comprehensive Security Analysis</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-900 border-gray-800 hover:border-green-600/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="bg-blue-600/20 p-4 rounded-full inline-block mb-4">
                  <Search className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Data Breach Check</h3>
                <p className="text-gray-400 text-sm">Scan for company emails in known data breaches using HaveIBeenPwned</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover:border-green-600/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="bg-green-600/20 p-4 rounded-full inline-block mb-4">
                  <Lock className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">SSL Certificate Analysis</h3>
                <p className="text-gray-400 text-sm">Check SSL certificate grade, validity, and security issues</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover:border-green-600/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="bg-orange-600/20 p-4 rounded-full inline-block mb-4">
                  <Shield className="h-8 w-8 text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Admin Panel Detection</h3>
                <p className="text-gray-400 text-sm">Identify exposed admin interfaces and login pages</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover:border-green-600/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="bg-purple-600/20 p-4 rounded-full inline-block mb-4">
                  <FileText className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Security Headers</h3>
                <p className="text-gray-400 text-sm">Analyze HTTP security headers and missing protections</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover:border-green-600/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="bg-cyan-600/20 p-4 rounded-full inline-block mb-4">
                  <Globe className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Subdomain Discovery</h3>
                <p className="text-gray-400 text-sm">Find subdomains through certificate transparency logs</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover:border-green-600/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="bg-yellow-600/20 p-4 rounded-full inline-block mb-4">
                  <Server className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">DNS Analysis</h3>
                <p className="text-gray-400 text-sm">Check DNS records and security-related configurations</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover:border-green-600/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="bg-indigo-600/20 p-4 rounded-full inline-block mb-4">
                  <Github className="h-8 w-8 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">GitHub Exposure</h3>
                <p className="text-gray-400 text-sm">Search for domain mentions in public repositories</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover:border-green-600/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="bg-red-600/20 p-4 rounded-full inline-block mb-4">
                  <AlertTriangle className="h-8 w-8 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Risk Assessment</h3>
                <p className="text-gray-400 text-sm">Comprehensive risk scoring with actionable insights</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-green-600/20 to-blue-600/20 border-green-600/30">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">8+</div>
              <p className="text-gray-300">Security Checks</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-600/30">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">&lt;15s</div>
              <p className="text-gray-300">Average Scan Time</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-600/30">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
              <p className="text-gray-300">Free to Use</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg p-8 border border-green-600/30">
          <h2 className="text-2xl font-bold text-white mb-4">Protect Your Business Today</h2>
          <p className="text-gray-300 mb-6">
            Don't wait for a security incident. Get a comprehensive security analysis of your domain 
            and discover potential vulnerabilities before cybercriminals do. Our free tool provides 
            enterprise-grade security insights in seconds.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <span>✓ No registration required</span>
            <span>✓ Real-time API integration</span>
            <span>✓ Comprehensive reporting</span>
            <span>✓ Mobile responsive</span>
          </div>
        </div>
      </main>
      <NeonFooter />
    </div>
  );
};

export default Index;
