
import React from 'react';
import { Shield, Lock, Eye, Database } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">Password Leaker</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Advanced password breach detection using k-anonymity to protect your privacy while keeping you secure.
        </p>
      </div>

      <div className="space-y-12">
        {/* Mission */}
        <div className="bg-gray-800 border border-green-500/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4 text-green-400">Our Mission</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Password Leaker helps individuals and organizations identify compromised passwords before they become security incidents. 
            By leveraging the extensive HaveIBeenPwned database and advanced k-anonymity techniques, we provide real-time breach 
            detection without compromising your privacy.
          </p>
        </div>

        {/* How It Works */}
        <div className="bg-gray-800 border border-green-500/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-green-400">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-600 rounded-full p-2 mt-1">
                  <Lock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">K-Anonymity Protection</h3>
                  <p className="text-gray-400">Your password is hashed locally and only the first 5 characters are sent to check against breach databases.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-green-600 rounded-full p-2 mt-1">
                  <Database className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Massive Database</h3>
                  <p className="text-gray-400">We check against billions of compromised passwords from verified data breaches worldwide.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-600 rounded-full p-2 mt-1">
                  <Eye className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Zero Knowledge</h3>
                  <p className="text-gray-400">We never see, store, or log your actual password. All processing happens in your browser.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-green-600 rounded-full p-2 mt-1">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Real-time Results</h3>
                  <p className="text-gray-400">Get instant risk assessment with detailed breach count and security recommendations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
