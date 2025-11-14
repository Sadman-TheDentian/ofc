
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

const heroImage = "https://blogger.googleusercontent.com/img/a/AVvXsEgKyvpArELsyfOnQb0iNOF8rSx2neMBe-gD0S7zAsKHKDdp2GTkOBhtRsto8gf07eXLfFhIou6L_X1_-bHuodabFPNHPCcHfgTOrqeOx3BQ0cHZgODohBHz1qPoY1KV42fKBtS9qRu7xQyChHv4dn3uA2QdwtgrVIHSnEi43eSSPsXZlOks59jRJelRbHo=w635-h354";

const rndPoints = [
    "New detection algorithms",
    "Zero-day exploit analysis",
    "Future-proof encryption models",
    "Quantum-resilient security research",
    "Automated threat prediction tools",
    "AI-driven attack simulations"
];

const aiPoints = [
    "Predictive threat modeling",
    "Automated response actions",
    "Behavioral anomaly detection",
    "Real-time risk scoring",
    "Intelligent malware analysis"
];

const techPoints = [
    "Cloud-native security frameworks",
    "Hybrid multi-cloud protection",
    "Autonomous threat hunting",
    "Dynamic vulnerability scanning",
    "Self-healing systems"
];


export default function InnovationPage() {
    return (
        <div className="bg-background text-foreground">
             <section className="relative w-full py-20 md:py-32 lg:py-40 bg-background overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={heroImage}
                        alt="Innovation in action"
                        fill
                        className="object-cover w-full h-full"
                        priority
                    />
                    <div className="absolute inset-0 bg-background/80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                </div>
                <div className="container relative z-10 text-center">
                    <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl max-w-4xl mx-auto">
                       Innovation: Always Evolving, Always Ahead
                    </h1>
                     <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
                       The cyber battlefield never sleeps. Threat actors innovate every day — so we must innovate faster.
                    </p>
                </div>
            </section>
            
            <main className="container max-w-4xl mx-auto py-16 px-4">
                <div className="prose prose-invert max-w-none text-foreground/90 prose-lg prose-headings:font-headline prose-headings:text-primary prose-a:text-primary prose-strong:text-foreground prose-ul:space-y-2">
                    <p>Innovation at DentiSystems is not optional. It is the fuel that keeps us ahead of adversaries.</p>
                    
                    <h2>What Innovation Means at DentiSystems</h2>
                    
                    <h3>Continuous Research & Development</h3>
                    <p>We operate like a cybersecurity laboratory, constantly pushing boundaries through:</p>
                    <ul>
                        {rndPoints.map(point => (
                             <li key={point} className="flex items-start">
                                <Check className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                    <p>Every breakthrough strengthens your defense.</p>

                     <h3>AI + Cybersecurity = The Future</h3>
                    <p>We integrate artificial intelligence deeply into our ecosystem:</p>
                     <ul>
                         {aiPoints.map(point => (
                             <li key={point} className="flex items-start">
                                <Check className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                    <p>AI doesn't replace us — it amplifies us.</p>
                    
                    <h3>Technology Built for Tomorrow</h3>
                    <p>We develop solutions designed not just for the present, but for the digital threats of the next decade. This includes:</p>
                     <ul>
                         {techPoints.map(point => (
                             <li key={point} className="flex items-start">
                                <Check className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                    <p>Attackers evolve — so do we. Faster. Smarter. Stronger.</p>

                    <h3>Creative Problem Solving</h3>
                    <p>Cyber threats don’t follow rules — so neither do we. We think beyond standard methods, approaching security challenges with creativity, innovation, and engineering excellence. Innovation isn't just about technology, It’s about mindset, courage, and vision.</p>

                    <h2>Our Promise</h2>
                    <p>Your security should never fall behind. With DentiSystems, you gain a partner constantly reinventing the future of digital defense. We don’t adapt to change. We create it.</p>
                </div>

                 <div className="text-center mt-16">
                    <Link href="/about" className="text-primary hover:underline">
                        ← Back to About Us
                    </Link>
                </div>
            </main>
        </div>
    );
}
