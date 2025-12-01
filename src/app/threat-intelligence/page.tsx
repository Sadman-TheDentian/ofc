
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, FileText, Newspaper, ShieldAlert, Mail } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

const threatReports = [
    {
        title: "The Rise of AI-Powered Phishing",
        date: "October 2024",
        description: "An in-depth analysis of how attackers are leveraging generative AI to create highly convincing phishing campaigns at scale.",
        imageUrl: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMEFJJTIwbmV0d29ya3xlbnwwfHx8fDE3NTg2MDM4MTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        imageHint: "abstract AI network"
    },
    {
        title: "Supply Chain Attacks on the Rise",
        date: "September 2024",
        description: "Examining recent high-profile supply chain compromises and outlining defensive strategies for modern enterprises.",
        imageUrl: "https://images.unsplash.com/photo-1639149503191-1f3c3d4a6a8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxnbG9iYWwlMjBzdXBwbHklMjBjaGFpbnxlbnwwfHx8fDE3NTg2MDQ3MDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        imageHint: "global supply chain"
    },
];

const securityAdvisories = [
    {
        id: "DS-2024-003",
        title: "Critical RCE in 'ConnectSphere' Library",
        severity: "Critical",
        severityColor: "bg-destructive",
        date: "Oct 26, 2024",
        description: "A remote code execution vulnerability has been discovered in a popular third-party library used by the 'ConnectSphere' SaaS platform."
    },
    {
        id: "DS-2024-002",
        title: "Active Exploitation of 'DataWeave' Framework",
        severity: "High",
        severityColor: "bg-orange-500",
        date: "Oct 22, 2024",
        description: "Threat actors are actively exploiting a zero-day vulnerability in the 'DataWeave' enterprise data framework."
    },
];

const blogPosts = [
    {
        title: "Deconstructing the Latest Social Engineering Scams",
        author: "Jane Doe, Principal Researcher",
        url: "/blog/post-1",
        imageUrl: "https://images.unsplash.com/photo-1555949963-ff9898a73a73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxwZXJzb24lMjB0aGlua2luZyUyMHNlY3VyaXR5fGVufDB8fHx8MTc1ODYwMzgyOHww&ixlib=rb-4.1.0&q=80&w=1080",
        imageHint: "person thinking security"
    },
    {
        title: "Securing Your Cloud: Beyond the Basics",
        author: "John Smith, Cloud Security Expert",
        url: "/blog/post-2",
        imageUrl: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxzZWN1cmUlMjBjbG91ZCUyMGRhdGF8ZW58MHx8fHwxNzU4NjAzODI4fDA&ixlib-rb-4.1.0&q=80&w=1080",
        imageHint: "secure cloud data"
    },
     {
        title: "The Future of Zero Trust Architecture",
        author: "Alex Johnson, Network Architect",
        url: "/blog/post-3",
        imageUrl: "https://images.unsplash.com/photo-1518434779774-d94213f80c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwYXJjaGl0ZWN0dXJlJTIwZGlhZ3JhbXxlbnwwfHx8fDE3NTg2MDM4MTh8MA&ixlib-rb-4.1.0&q=80&w=1080",
        imageHint: "network architecture diagram"
    },
];

export default function ThreatIntelligencePage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center max-w-4xl mx-auto mb-16 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
          Threat Intelligence Center
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Actionable insights and research from the front lines of cybersecurity.
        </p>
      </div>

      <section id="reports" className="mb-20">
        <h2 className="font-headline text-3xl font-bold tracking-tighter mb-8 border-l-4 border-primary pl-4">Latest Threat Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {threatReports.map(report => (
                <Card key={report.title} className="flex flex-col overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 rounded-xl bg-gradient-to-br from-card to-card/80 border-border/50 group">
                    <div className="relative h-56 w-full">
                        <Image src={report.imageUrl} alt={report.title} fill style={{ objectFit: 'cover' }} className="group-hover:scale-105 transition-transform duration-300" data-ai-hint={report.imageHint}/>
                    </div>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">{report.title}</CardTitle>
                        <CardDescription>{report.date}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-muted-foreground">{report.description}</p>
                    </CardContent>
                    <div className="p-6 pt-0">
                        <Button variant="link" className="p-0">Read Report <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </div>
                </Card>
            ))}
        </div>
      </section>
      
      <section id="advisories" className="mb-20">
        <h2 className="font-headline text-3xl font-bold tracking-tighter mb-8 border-l-4 border-primary pl-4">Security Advisories</h2>
        <div className="space-y-4">
            {securityAdvisories.map(advisory => (
                <Card key={advisory.id} className="bg-gradient-to-br from-card to-card/80 border-border/50 hover:border-primary/50 transition-colors">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="font-headline text-lg">{advisory.title}</CardTitle>
                                <CardDescription>{advisory.id} • {advisory.date}</CardDescription>
                            </div>
                            <div className={`text-xs font-bold uppercase px-3 py-1 rounded-full text-white ${advisory.severityColor}`}>{advisory.severity}</div>
                        </div>
                    </CardHeader>
                     <CardContent>
                        <p className="text-muted-foreground">{advisory.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>

      <section id="research-blog" className="mb-20">
          <h2 className="font-headline text-3xl font-bold tracking-tighter mb-8 border-l-4 border-primary pl-4">From Our Research Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.map(post => (
                  <Link href={post.url} key={post.title} className="group">
                    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 rounded-xl bg-gradient-to-br from-card to-card/80 border-border/50">
                        <div className="relative h-40 w-full">
                            <Image src={post.imageUrl} alt={post.title} fill style={{ objectFit: 'cover' }} className="group-hover:scale-105 transition-transform" data-ai-hint={post.imageHint} />
                        </div>
                        <CardHeader>
                            <CardTitle className="text-md font-headline group-hover:text-primary transition-colors">{post.title}</CardTitle>
                             <CardDescription className="text-xs">{post.author}</CardDescription>
                        </CardHeader>
                    </Card>
                  </Link>
              ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
                <Link href="/blog">Visit the Full Blog</Link>
            </Button>
          </div>
      </section>

       <section className="bg-secondary/50 rounded-xl p-8 lg:p-12 text-center">
            <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-headline text-2xl font-bold mb-3">Stay Ahead of Threats</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Subscribe to our intelligence briefings to receive the latest threat reports and security advisories directly in your inbox.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input type="email" placeholder="Enter your email address" className="flex-grow h-12 px-4 rounded-md bg-background/80 border-input border" />
                <Button size="lg" type="submit">Subscribe</Button>
            </form>
        </section>
    </div>
  );
}

    