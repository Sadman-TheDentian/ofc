
import { Shield, Eye, Lock, Wifi, Database, Key } from 'lucide-react';

const Tools = () => {
  const upcomingTools = [
    {
      icon: Eye,
      title: 'Password Strength Analyzer',
      description: 'Test your password strength against advanced cracking algorithms',
      status: 'Coming Soon',
      eta: 'Q2 2025'
    },
    {
      icon: Lock,
      title: 'Secure Password Generator',
      description: 'Generate cryptographically secure passwords with custom rules',
      status: 'In Development',
      eta: 'Q1 2025'
    },
    {
      icon: Wifi,
      title: 'Network Security Scanner',
      description: 'Scan your network for vulnerabilities and security issues',
      status: 'Coming Soon',
      eta: 'Q3 2025'
    },
    {
      icon: Database,
      title: 'Data Leak Monitor',
      description: 'Continuous monitoring for new data breaches and leaks',
      status: 'Planning',
      eta: 'Q4 2025'
    },
    {
      icon: Key,
      title: 'Digital Identity Checker',
      description: 'Comprehensive scan of your digital footprint across the web',
      status: 'Research',
      eta: '2026'
    },
    {
      icon: Shield,
      title: 'Threat Intelligence Feed',
      description: 'Real-time cybersecurity threat updates and alerts',
      status: 'Research',
      eta: '2026'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Development':
        return 'text-primary border-primary';
      case 'Coming Soon':
        return 'text-yellow-500 border-yellow-500';
      case 'Planning':
        return 'text-blue-400 border-blue-400';
      case 'Research':
        return 'text-purple-400 border-purple-400';
      default:
        return 'text-muted-foreground border-muted-foreground';
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 neon-text">
            Security Tools Suite
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive cybersecurity tools designed to protect your digital life. All free, always.
          </p>
        </div>

        {/* Current Tool */}
        <div className="cyber-card mb-16 text-center neon-glow">
          <Shield className="h-16 w-16 mx-auto neon-text mb-6 animate-pulse-neon" />
          <h2 className="text-3xl font-bold neon-text mb-4">DarkCheck</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Our flagship breach detection tool is live and protecting users worldwide.
          </p>
          <div className="inline-flex items-center px-4 py-2 rounded-lg bg-primary/20 border border-primary">
            <span className="text-primary font-semibold">✓ LIVE</span>
          </div>
        </div>

        {/* Upcoming Tools */}
        <div>
          <h2 className="text-3xl font-bold neon-text mb-8 text-center">Coming Soon</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <div key={index} className="cyber-card group hover:neon-glow transition-all duration-300">
                  <div className="mb-4">
                    <Icon className="h-12 w-12 neon-text group-hover:animate-pulse-neon" />
                  </div>
                  
                  <h3 className="text-xl font-semibold neon-text mb-3">
                    {tool.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 min-h-[3rem]">
                    {tool.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className={`text-sm px-3 py-1 rounded-full border ${getStatusColor(tool.status)}`}>
                      {tool.status}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ETA: {tool.eta}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="cyber-card max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold neon-text mb-4">
              Want to be notified?
            </h3>
            <p className="text-muted-foreground mb-6">
              Be the first to know when new security tools are released. Join our community of security-conscious users.
            </p>
            <button className="cyber-button px-8 py-3 rounded-lg font-semibold">
              Join Waitlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
