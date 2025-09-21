
import React from 'react';
import PasswordChecker from '../components/PasswordChecker';
import NeonHeader from '@/components/NeonHeader';
import NeonFooter from '@/components/NeonFooter';

const Home = () => {
  return (
    <div className="min-h-screen bg-cyber-bg text-white flex flex-col">
      <NeonHeader />
      <main className="flex-grow">
        <PasswordChecker />
      </main>
      <NeonFooter />
    </div>
  );
};

export default Home;
