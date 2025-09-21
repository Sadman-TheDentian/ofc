
import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from '@/components/Layout';
import { AlertTriangle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-600/20 p-6 rounded-full inline-block mb-6">
            <AlertTriangle className="h-16 w-16 text-red-400" />
          </div>
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
          <p className="text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back to safety.
          </p>
          <Link to="/">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Home className="h-4 w-4 mr-2" />
              Return to LeakScan
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
