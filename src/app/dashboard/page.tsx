'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Shield, KeyRound, Siren, Code } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';

const tools = [
  {
    title: 'DarkCheck',
    description: 'Scan dark web for credential leaks.',
    icon: KeyRound,
    href: 'https://darkcheck.denti.systems'
  },
  {
    title: 'LeakScan',
    description: 'Discover exposed assets & info.',
    icon: Shield,
    href: 'https://leakscan.denti.systems'
  },
  {
    title: 'PhishRisk',
    description: 'Assess phishing risk of domains.',
    icon: Siren,
    href: 'https://phishrisk.denti.systems'
  },
  {
    title: 'Password Leaker',
    description: 'Check for leaked passwords.',
    icon: Code,
    href: 'https://passwordleaker.denti.systems'
  }
]

export default function DashboardOverviewPage() {
  const { user } = useAuth();
  
  return (
    <div>
      <h1 className="font-headline text-2xl font-bold mb-4">
        Welcome Back, {user?.displayName || 'Operator'}
      </h1>
      <p className="text-muted-foreground mb-8">
        Here's a snapshot of your security posture and tools.
      </p>

      <div>
        <h2 className="font-headline text-xl font-bold mb-4">Our Security Tools</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map(tool => (
             <a href={tool.href} key={tool.title} target="_blank" rel="noopener noreferrer">
              <Card className="hover:border-primary/50 transition-colors h-full bg-gradient-to-br from-card to-card/80 border-border/50">
                <CardHeader>
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <tool.icon className="h-5 w-5 text-primary" />
                    {tool.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
