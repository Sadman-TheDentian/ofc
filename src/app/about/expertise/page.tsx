
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

const heroImage = "https://blogger.googleusercontent.com/img/a/AVvXsEic3sHUvr_T2_6WSx-BUfO1t9T3BAAfhyiN8dWAsaEJSxP7_-c3w7RgMkF8Bbw4AYKTYrVd9HDQte7HvRjoOQKLPrlSvHOlhOK3hhLHaZQo2gGoi1eT6hznYtFfglkHqhlc3nPDRCGDNMDJhoQewbKrFoE9g5hRsKp8YPog5tabjXe1SDk-OciMupiea3M=w641-h358";

const expertiseAreas = [
    "Offensive security & red teaming",
    "Adversary simulation",
    "Threat intelligence analysis",
    "Secure-by-design software engineering",
    "Cloud & infrastructure security",
    "AI-enhanced defensive systems",
    "Digital forensics & incident response"
];

const innovationPoints = [
    "Zero-day vulnerability research",
    "Continuous R&D",
    "Deep code analysis",
    "Weekly attack simulation exercises",
    "Reverse engineering malware campaigns"
];

const resultPoints = [
    "Stronger system resilience",
    "Faster detection & response",
    "Smarter security decisions",
    "Robust long-term protection",
    "Cleaner, more secure code",
    "Fine-tuned architectures for any scale"
];

export default function ExpertisePage() {
    return (
        <div className="bg-background text-foreground">
             <section className="relative w-full py-20 md:py-32 lg:py-40 bg-background overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={heroImage}
                        alt="Expertise in action"
                        fill
                        className="object-cover w-full h-full"
                        priority
                    />
                    <div className="absolute inset-0 bg-background/80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                </div>
                <div className="container relative z-10 text-center">
                    <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl max-w-4xl mx-auto">
                        Expertise: The Power Behind Our Protection
                    </h1>
                     <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
                        At DentiSystems, expertise is more than a qualification — it is the engine that drives our entire mission.
                    </p>
                </div>
            </section>
            
            <main className="container max-w-4xl mx-auto py-16 px-4">
                <div className="prose prose-invert max-w-none text-foreground/90 prose-lg prose-headings:font-headline prose-headings:text-primary prose-a:text-primary prose-strong:text-foreground prose-ul:space-y-2">
                    <p>Our strength comes from the minds that have spent years inside real threats, real code, and real cyber battlefields.</p>
                    
                    <h2>What “Expertise” Means at DentiSystems</h2>
                    
                    <h3>A Team Forged by Experience</h3>
                    <p>Our professionals are industry veterans with decades of combined experience in:</p>
                    <ul>
                        {expertiseAreas.map(area => (
                             <li key={area} className="flex items-start">
                                <Check className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                <span>{area}</span>
                            </li>
                        ))}
                    </ul>
                    <p>Every specialist has been tested in real-world cyber operations where precision, speed, and strategy determine success.</p>

                    <h3>Mastery of Modern Threats</h3>
                    <p>Cybersecurity evolves constantly — and so does our expertise. We stay ahead through:</p>
                    <ul>
                         {innovationPoints.map(point => (
                             <li key={point} className="flex items-start">
                                <Check className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                    <p>This allows us to predict threats before they reach your systems.</p>

                    <h3>Knowledge That Turns Into Results</h3>
                    <p>Our expertise directly translates to:</p>
                    <ul>
                        {resultPoints.map(point => (
                             <li key={point} className="flex items-start">
                                <Check className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                    <p>We don’t guess — we know. And we use that knowledge to shield what matters to you.</p>

                    <h2>Our Promise</h2>
                    <p>When you work with DentiSystems, you’re not getting just another cybersecurity service. You are gaining access to world-class minds, razor-sharp technical skills, and a team obsessed with protecting your digital world. Your defense starts with expertise — and ours is unmatched.</p>
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
