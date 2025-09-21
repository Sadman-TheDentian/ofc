
import React from 'react';
import Layout from '@/components/Layout';
import { Shield, Eye, AlertTriangle, Key, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Tools = () => {
  const tools = [
    {
      name: 'LeakScan',
      description: 'Comprehensive domain security scanner that identifies exposed credentials, admin panels, and GitHub mentions.',
      icon: Shield,
      url: 'https://leakscan.denti.systems',
      status: 'current',
      features: ['Email breach detection', 'Admin panel scanning', 'GitHub mentions', 'Risk assessment']
    },
    {
      name: 'DarkCheck',
      description: 'Dark web monitoring tool that scans for your credentials and sensitive information across hidden networks.',
      icon: Eye,
      url: 'https://darkcheck.denti.systems',
      status: 'available',
      features: ['Dark web scanning', 'Credential monitoring', 'Identity theft protection', 'Real-time alerts']
    },
    {
      name: 'PhishRisk',
      description: 'Advanced phishing detection system that analyzes URLs and emails for potential security threats.',
      icon: AlertTriangle,
      url: 'https://phishrisk.denti.systems',
      status: 'available',
      features: ['URL analysis', 'Email threat detection', 'Phishing indicators', 'Safety scoring']
    },
    {
      name: 'Password Leaker',
      description: 'Password security checker that verifies if your passwords have been compromised in data breaches.',
      icon: Key,
      url: 'https://passwordleaker.denti.systems',
      status: 'available',
      features: ['Password breach checking', 'Strength analysis', 'Security recommendations', 'Instant results']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current':
        return 'bg-green-600 text-white';
      case 'available':
        return 'bg-blue-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'current':
        return 'Current Tool';
      case 'available':
        return 'Available';
      default:
        return 'Coming Soon';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Security <span className="text-green-400">Tools</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive cybersecurity toolkit by DentiSystems. Protect your digital assets 
            with our suite of professional security assessment tools.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <Card key={index} className="bg-gray-900 border-gray-800 hover:border-green-600/50 transition-all duration-300 hover:transform hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="bg-green-600/20 p-3 rounded-lg mr-4">
                        <Icon className="h-8 w-8 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{tool.name}</h3>
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${getStatusColor(tool.status)}`}>
                          {getStatusText(tool.status)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-2">Key Features:</h4>
                    <ul className="text-gray-400 text-sm space-y-1">
                      {tool.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    {tool.status === 'current' ? (
                      <Button className="bg-green-600 hover:bg-green-700 text-white flex-1">
                        Current Tool
                      </Button>
                    ) : (
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                        onClick={() => window.open(tool.url, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Tool
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* About DentiSystems */}
        <Card className="bg-gradient-to-r from-gray-900 to-gray-800 border-green-600/30">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">About DentiSystems</h2>
            <p className="text-gray-300 text-lg mb-6 max-w-3xl mx-auto">
              DentiSystems is dedicated to developing cutting-edge cybersecurity tools that make 
              enterprise-grade security accessible to businesses of all sizes. Our suite of tools 
              provides comprehensive protection against modern digital threats.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Professional Grade</h3>
                <p className="text-gray-400 text-sm">Enterprise-level security tools designed for real-world threats</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Fast & Reliable</h3>
                <p className="text-gray-400 text-sm">Lightning-fast scans with accurate, actionable results</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Privacy Focused</h3>
                <p className="text-gray-400 text-sm">Your data stays private - we don't store or log your queries</p>
              </div>
            </div>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white mt-6"
              onClick={() => window.open('https://denti.systems', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Learn More About DentiSystems
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Tools;
