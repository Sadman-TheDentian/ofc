
import { Link } from 'react-router-dom';
import { Zap, Lock, Shield, ArrowRight, CheckCircle } from 'lucide-react';

const Home = () => {
  return (
    <div>
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 neon-text tracking-tight">
              Has Your Data Been Compromised?
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Find out if your email or password has been exposed in a data breach. 
              Fast, secure, and completely free.
            </p>
            <Link 
              to="/check" 
              className="cyber-button inline-flex items-center space-x-2 text-lg"
            >
              <span>Scan Now</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-background/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12 neon-text">Why Use DarkCheck?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="cyber-card text-center transition-all hover:border-primary/50 hover:shadow-primary/10">
                <Zap className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
                <p className="text-muted-foreground">
                  Get immediate feedback on whether your data has been compromised.
                </p>
              </div>
              <div className="cyber-card text-center transition-all hover:border-primary/50 hover:shadow-primary/10">
                <Lock className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">100% Private</h3>
                <p className="text-muted-foreground">
                  Your data is never stored. All checks are performed securely.
                </p>
              </div>
              <div className="cyber-card text-center transition-all hover:border-primary/50 hover:shadow-primary/10">
                <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Comprehensive</h3>
                <p className="text-muted-foreground">
                  Check against 500+ known data breaches and compromised databases.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12 neon-text">How It Works</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 rounded-lg bg-card/50">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-lg">Enter your email or password</h3>
                  <p className="text-muted-foreground">
                    Simply type in the email address or password you want to check.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 rounded-lg bg-card/50">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-lg">We check our databases</h3>
                  <p className="text-muted-foreground">
                    Your information is securely checked against known breaches.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 rounded-lg bg-card/50">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-lg">Get instant results</h3>
                  <p className="text-muted-foreground">
                    See if your data has been compromised and get security recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 bg-background/50">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="cyber-card">
                <div className="text-4xl font-bold mb-2 neon-text">15B+</div>
                <div className="text-muted-foreground">Breached Records</div>
              </div>
              <div className="cyber-card">
                <div className="text-4xl font-bold mb-2 neon-text">500+</div>
                <div className="text-muted-foreground">Data Sources</div>
              </div>
              <div className="cyber-card">
                <div className="text-4xl font-bold mb-2 neon-text">24/7</div>
                <div className="text-muted-foreground">Monitoring</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center max-w-4xl">
            <h2 className="text-3xl font-bold mb-4 neon-text">
              Protect yourself today
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Don't wait until it's too late. Check if your data has been compromised now.
            </p>
            <Link 
              to="/check" 
              className="cyber-button inline-flex items-center space-x-2 text-lg"
            >
              <CheckCircle className="h-5 w-5" />
              <span>Start Free Check</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
