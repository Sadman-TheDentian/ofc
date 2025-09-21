
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Users, BarChart, Shield, Target } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const teamMembers = [
  {
    name: "MD Sadman Shovik",
    title: "Chief Executive Officer",
    bio: "Visionary leader driving the company's mission to redefine cybersecurity and deliver unparalleled value to our clients and partners.",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjnetv9JhyFhyphenhyphenhjI3lzjEAeIksFB40uZ_YPPrYVcKxuPljD11gmkVAEt9AJS2yit9RDnSPlMU_Nz5Y4CNIsY36FN7MLqmispDTpE8Tm3oyogWyHiqZd01x_gaymWVsb0AlyYEkgL-SZKY5arc73BsNX8oyxVx5R-Zd3Q0UWe1CA_JeIPrWv0vIhabluV5w/s320/formal.png",
    imageHint: "professional headshot ceo",
  },
  {
    name: "MD Shahriar Ahmed",
    title: "Chief Operating Officer",
    bio: "Orchestrating operational excellence and ensuring the seamless delivery of our cutting-edge security services and solutions.",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhbIm_ANXzgqIl6ZahonnEf9-htLR8WzJ77E2mcm8jtPCO2uIKbi0PkAH1K3DbKh4DKRvIkQFS3MvN5r6bB4Rf8Cw_yAFVQNiTl4Z0Yw1NdDEX6bbATLnBN_niWIYaE4KeIrVb4aCjmp58kKv3DSAEkswm3gmeONjFPYkizNlhWnWLcu_rVDCgM8t0E06w/s320/zisan%201.jpg",
    imageHint: "professional headshot coo",
  },
  {
    name: "Monutosh Paul",
    title: "Chief Technology Officer",
    bio: "Architecting the next generation of security technology, from our AI-powered platforms to our secure development frameworks.",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg8Bzmi-MJaHEVL3-3daKFXozkXe_R3tVN8vshuUk6k2vNRynvWz-8RjkrOQJbN3istFuhFrp8tdGpFKW32biBHb0dyct47lTLJhdz5IbDRlFssJgP1ezkQEdWr1hXnmd8crD9Xxtjs3xwyjllJVR8ldMaBVWMPOlrVtCJx217-p2w-QRM1qewPCW34UYY/s320/monotosh.png",
    imageHint: "professional headshot cto",
  },
  {
    name: "MD Sajidur Rahman",
    title: "Chief Sales Officer",
    bio: "Forging strategic partnerships and leading our sales division to bring DentiSystems' solutions to organizations worldwide.",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjM-mYw-6sYuhQdDXcVcZpkTk8VUhWTDCixXCpXX8nXYsaWTcmP3AdG7OdzNvli8W6JMx1E6wffod7GgUcgTauWKsSsY7jyp65nX1S2aOLzoGQ0eFxevGOMqYaC0dmd6cM_DqtkkE_zccD9w1SCVtXP18jNGjRmcQ1Jt_94WnN5RQmOr7fGlSjvBdcmEgg/s320/sajid.jpeg",
    imageHint: "professional headshot sales",
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
      <div className="text-center max-w-3xl mx-auto mb-16 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50">
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
            <Card className="bg-gradient-to-br from-card to-card/80 border-border/50">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-12">
          {teamMembers.map((member, index) => (
            <Card key={index} className="bg-gradient-to-br from-card to-card/80 border-border/50 text-center">
              <CardContent className="p-6">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4 border-2 border-primary/50 object-cover w-32 h-32"
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
