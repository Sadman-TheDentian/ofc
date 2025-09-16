
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Users, BarChart, Shield, Target } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const teamMembers = [
  {
    name: "Alex 'Havoc' Chen",
    title: "Founder & Lead Security Architect",
    bio: "With over 15 years in offensive security, Alex has led red team operations against Fortune 500 companies. He founded DentiSystems to bring proactive, attacker-mindset security to the enterprise world.",
    imageUrl: "https://picsum.photos/seed/team1/400/400",
    imageHint: "professional headshot man",
  },
  {
    name: "Dr. Evelyn Reed",
    title: "Head of R&D",
    bio: "A PhD in cryptography and machine learning, Evelyn architects our proprietary AI models for threat detection and analysis, pushing the boundaries of predictive security.",
    imageUrl: "https://picsum.photos/seed/team2/400/400",
    imageHint: "professional headshot woman",
  },
  {
    name: "Marcus 'Forge' Bell",
    title: "Principal Web Engineer",
    bio: "Marcus is a full-stack virtuoso who specializes in building resilient, scalable, and secure web infrastructures. He ensures every line of code is a fortress.",
    imageUrl: "https://picsum.photos/seed/team3/400/400",
    imageHint: "professional headshot man tech",
  },
];

const stats = [
  {
    icon: BarChart,
    value: "1.2M+",
    label: "Threats Analyzed",
  },
  {
    icon: Shield,
    value: "99.8%",
    label: "Ransomware Resilience",
  },
  {
    icon: Users,
    value: "150+",
    label: "Enterprises Secured",
  },
];

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
          About DentiSystems
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          We are a collective of elite security researchers, ethical hackers, and
          web engineers dedicated to fortifying the digital world.
        </p>
      </div>

      <section className="mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-headline text-2xl font-bold border-l-4 border-primary pl-4">
              Our Mission
            </h2>
            <p className="text-muted-foreground">
              In a world of escalating digital threats, passive defense is no
              longer enough. Our mission is to provide organizations with an

              attacker&apos;s advantage. We combine deep offensive security expertise
              with secure development practices to build digital experiences
              that are not just functional, but fundamentally resilient.
            </p>
            <p className="text-muted-foreground">
              We don&apos;t just patch vulnerabilities; we re-engineer the very
              foundation of your web presence to eliminate entire classes of
              risk, ensuring your operations, data, and reputation are secure
              from the ground up.
            </p>
          </div>
          <div>
            <Card className="bg-card">
              <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <stat.icon className="h-10 w-10 text-primary mx-auto mb-3" />
                    <p className="text-3xl font-bold text-primary">
                      {stat.value}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter mb-12">
          Meet the Experts
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {teamMembers.map((member, index) => (
            <Card key={index} className="bg-card border-border/50 text-center">
              <CardContent className="p-6">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4 border-2 border-primary/50"
                  data-ai-hint={member.imageHint}
                />
                <h3 className="font-headline text-xl font-semibold">
                  {member.name}
                </h3>
                <p className="text-primary text-sm font-medium mb-2">
                  {member.title}
                </p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="bg-secondary/50 rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="font-headline text-2xl font-bold mb-3">Join Our Mission</h3>
            <p className="text-muted-foreground mb-6">We are always looking for exceptional talent to join our ranks. If you live and breathe cybersecurity and want to make a real-world impact, we want to hear from you.</p>
            <Button size="lg" asChild>
                <Link href="/contact">View Open Positions</Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
