
import { Shield, Globe, Users, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 neon-text">
            About DentiSystems
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A global cybersecurity brand dedicated to building free, accessible security tools for everyone.
          </p>
        </div>

        {/* Mission Section */}
        <div className="cyber-card mb-12">
          <div className="text-center">
            <Shield className="h-16 w-16 mx-auto neon-text mb-6 animate-pulse-neon" />
            <h2 className="text-3xl font-bold neon-text mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At DentiSystems, we believe cybersecurity should be accessible to everyone, not just those who can afford expensive enterprise solutions. Our mission is to democratize digital security by creating powerful, free tools that protect individuals and small businesses from cyber threats.
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="cyber-card text-center group hover:neon-glow transition-all duration-300">
            <Globe className="h-12 w-12 mx-auto neon-text mb-4 group-hover:animate-pulse-neon" />
            <h3 className="text-xl font-semibold neon-text mb-3">Global Reach</h3>
            <p className="text-muted-foreground">
              Protecting users worldwide with tools available in multiple languages and regions.
            </p>
          </div>

          <div className="cyber-card text-center group hover:neon-glow transition-all duration-300">
            <Users className="h-12 w-12 mx-auto neon-text mb-4 group-hover:animate-pulse-neon" />
            <h3 className="text-xl font-semibold neon-text mb-3">Community First</h3>
            <p className="text-muted-foreground">
              Building tools based on real user needs and community feedback.
            </p>
          </div>

          <div className="cyber-card text-center group hover:neon-glow transition-all duration-300">
            <Zap className="h-12 w-12 mx-auto neon-text mb-4 group-hover:animate-pulse-neon" />
            <h3 className="text-xl font-semibold neon-text mb-3">Innovation</h3>
            <p className="text-muted-foreground">
              Leveraging cutting-edge AI and machine learning for advanced threat detection.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="cyber-card mb-12">
          <h2 className="text-3xl font-bold neon-text mb-6">Our Story</h2>
          <div className="space-y-6 text-muted-foreground">
            <p>
              Founded in 2024, DentiSystems emerged from a simple observation: while cyber threats were becoming more sophisticated and widespread, the tools to defend against them remained expensive and complex.
            </p>
            <p>
              Our team of security researchers, developers, and AI specialists came together with a shared vision of making enterprise-grade cybersecurity accessible to everyone. We started with DarkCheck, our flagship breach detection tool, and are continuously expanding our suite of free security tools.
            </p>
            <p>
              Today, DentiSystems protects millions of users worldwide, providing real-time threat intelligence and security tools that anyone can use, regardless of their technical expertise or budget.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="cyber-card">
          <h2 className="text-3xl font-bold neon-text mb-6">Powered by AI</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            DentiSystems is proudly powered by advanced artificial intelligence, enabling us to process vast amounts of threat data, identify emerging security patterns, and deliver instant results to our users. Our AI-driven approach allows us to stay ahead of cybercriminals and provide cutting-edge protection that evolves with the threat landscape.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
