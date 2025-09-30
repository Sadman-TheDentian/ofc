import type { Service, Tool } from "./types";
import {
  ShieldCheck,
  Zap,
  Code,
  KeyRound,
  ShieldHalf,
  Siren,
} from "lucide-react";

export const services: Service[] = [
  {
    id: 1,
    slug: "high-risk-vendor-recon",
    title: "High-Risk Vendor Recon",
    description:
      "We identify and analyze your high-risk vendors to uncover potential breach points and supply chain vulnerabilities.",
    longDescription:
      "Our High-Risk Vendor Reconnaissance service provides an in-depth analysis of your third-party ecosystem. We meticulously map out your supply chain, identifying vendors with access to sensitive data and systems. Using a combination of OSINT, dark web monitoring, and proprietary techniques, we assess their security posture, uncovering misconfigurations, leaked credentials, and past breaches. This proactive approach allows you to address supply chain risks before they escalate into costly incidents, ensuring your entire operational pipeline remains secure.",
    icon: ShieldCheck,
    imageUrl: "https://picsum.photos/seed/s1/800/500",
    imageHint: "data security",
  },
  {
    id: 2,
    slug: "assurance-services",
    title: "Assurance Services",
    description:
      "Comprehensive penetration testing and ransomware resilience assessments to fortify your defenses.",
    longDescription:
      "DentiSystems' Assurance Services are designed to rigorously test and validate your security controls. Our expert team conducts realistic penetration tests, simulating attacks from sophisticated adversaries to identify exploitable vulnerabilities in your network, applications, and cloud infrastructure. We also provide ransomware resilience assessments, evaluating your ability to withstand and recover from a ransomware attack. Our detailed reports provide actionable recommendations to strengthen your security posture and minimize your attack surface.",
    icon: Zap,
    imageUrl: "https://picsum.photos/seed/s2/800/500",
    imageHint: "network infrastructure",
  },
  {
    id: 3,
    slug: "secure-web-development",
    title: "Secure Web Development",
    description:
      "Custom web engineering with security baked in from the ground up, reducing your operational risk.",
    longDescription:
      "We build high-performance, scalable web applications with a security-first mindset. Our development lifecycle integrates security at every stage, from threat modeling and secure coding practices to continuous security testing and infrastructure hardening. By embedding security into the DNA of your applications, we help you launch products faster without compromising on safety. Whether it's a customer-facing portal or a critical internal tool, we deliver web solutions that are resilient by design, protecting your data and your reputation.",
    icon: Code,
    imageUrl: "https://picsum.photos/seed/s3/800/500",
    imageHint: "developer laptop code",
  },
  {
    id: 4,
    slug: "incident-response-forensics",
    title: "Incident Response & Forensics",
    description:
      "Rapid response to security breaches to minimize damage, recover data, and identify the root cause.",
    longDescription:
      "When a security incident occurs, time is critical. Our Incident Response & Forensics team provides rapid, expert assistance to contain the threat, eradicate the attacker's presence, and restore your systems to normal. We conduct detailed digital forensic investigations to understand the attack vector, determine the extent of the breach, and gather evidence for legal action. Our goal is to not only resolve the immediate crisis but also to provide you with the insights needed to prevent future incidents.",
    icon: Siren,
    imageUrl: "https://picsum.photos/seed/s4/800/500",
    imageHint: "emergency server room",
  },
];

export const tools: Tool[] = [
  {
    id: 5,
    slug: "code-leak-detector",
    title: "AI Code Leak Detector",
    description: "Use AI to analyze code snippets for hardcoded secrets.",
    longDescription: "Our AI-powered Code Leak Detector allows developers to quickly check their code for secrets like API keys and passwords. Get instant feedback and suggestions for remediation.",
    icon: KeyRound,
    url: "/tools/code-leak-detector",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgC1T9VEOh8KS203i5YYu12JL6YCG05OG9sx842IhkPl2jtLXNmkHmsl3aesCEWEvmrx1pOIb7Lof2YW-aYHZ-1Ccs4wbr6jxIbKqOVHIPYyHf4p8r6plyAsfrY7Kork98eFxZLQgT8teoUefQiukF_o8xI51HdNJYkavpZtjFzuP9NpbLjxvaEc_pjEKU/s320/DentiScan.png",
    screenshots: [
        { id: 1, url: 'https://picsum.photos/seed/cld1/1200/800', alt: 'AI Code Leak Detector interface showing results', hint: 'code editor alert' }
    ]
  },
   {
    id: 6,
    slug: "code-scanner",
    title: "Code Vulnerability Scanner",
    description: "Use AI to analyze code snippets for common security vulnerabilities.",
    longDescription: "Our AI-powered Code Vulnerability Scanner allows developers to quickly check their code for issues like SQL Injection, XSS, and more. Get instant feedback and suggestions for remediation directly in your workflow.",
    icon: ShieldHalf,
    url: "/tools/code-scanner",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgC1T9VEOh8KS203i5YYu12JL6YCG05OG9sx842IhkPl2jtLXNmkHmsl3aesCEWEvmrx1pOIb7Lof2YW-aYHZ-1Ccs4wbr6jxIbKqOVHIPYyHf4p8r6plyAsfrY7Kork98eFxZLQgT8teoUefQiukF_o8xI51HdNJYkavpZtjFzuP9NpbLjxvaEc_pjEKU/s320/DentiScan.png",
    screenshots: [
        { id: 1, url: 'https://picsum.photos/seed/cvs1/1200/800', alt: 'AI Code Vulnerability Scanner interface', hint: 'code editor' }
    ]
  }
];

export const securityAdvisories = [
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

export const blogPosts = [
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
        imageUrl: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxzZWN1cmUlMjBjbG91ZCUyMGRhdGF8ZW58MHx8fHwxNzU4NjAzODI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
        imageHint: "secure cloud data"
    },
     {
        title: "The Future of Zero Trust Architecture",
        author: "Alex Johnson, Network Architect",
        url: "/blog/post-3",
        imageUrl: "https://images.unsplash.com/photo-1518434779774-d94213f80c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwYXJjaGl0ZWN0dXJlJTIwZGlhZ3JhbXxlbnwwfHx8fDE3NTg2MDM4MTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        imageHint: "network architecture diagram"
    },
];
