import type { Service, Tool } from "./types";
import {
  ShieldCheck,
  Zap,
  Code,
  Search,
  Fingerprint,
  KeyRound,
  Scan,
  ShieldHalf,
  Siren,
  Cloud,
  Monitor,
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
    id: 1,
    slug: "darkcheck",
    title: "DarkCheck",
    description:
      "Monitor the dark web for mentions of your brand, domains, and employee credentials.",
    longDescription: "DarkCheck continuously scours dark web marketplaces, forums, and paste sites for any signs of your organization's compromised data. Receive real-time alerts when your assets are detected, allowing you to take immediate action.",
    icon: Search,
    url: "/tools/darkcheck",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhP0_bWguZ5wH-zwO9nWFsKIf6oJtiqyUNuF87wE7CBzUEJe7xfDLoYWtUmJaC0p1LSGHfsWkmhSn8-mH5JnYKre-LKkEl9zCC4PSmM89ke2Dg4E14yZejNEd0zGPlo_b09JMSRGBaUC3NnkkjlfU0KtATGbgmiK_PdrcgYisrwITVnOeZ420EUyg92T2w/s320/Darkcheck.png",
    screenshots: [
      { id: 1, url: 'https://picsum.photos/seed/ds1/1200/800', alt: 'DarkCheck dashboard showing breach statistics', hint: 'dashboard chart' },
      { id: 2, url: 'https://picsum.photos/seed/ds2/1200/800', alt: 'DarkCheck alert configuration page', hint: 'settings form' }
    ]
  },
  {
    id: 2,
    slug: "phishrisk",
    title: "PhishRisk",
    description:
      "Assess your organization's susceptibility to phishing attacks with simulated campaigns.",
    longDescription: "PhishRisk allows you to run realistic, automated phishing simulations to test employee awareness. Track open rates, click rates, and data entry to identify vulnerabilities and target training where it's needed most.",
    icon: Fingerprint,
    url: "/tools/phishrisk",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjaDT7-W90QmoQPNtx9ZKZd_ZXDzjAx41rprheeshOMZ2k-0c5K4JXPkK5COAWvZcd8FU03p99VJTvBPxOS2aDYWsj3IgZ8c4X6AdS-QxQwIWeXlQ3IWl423Zwl-l7N9Rivm395N3kqigtsfPlxMY_a83BMsFbF3VvlElmmQaZGfBf6C-EM_1Ys71T4t1g/s320/PhishRisk.png",
    screenshots: [
        { id: 1, url: 'https://picsum.photos/seed/pr1/1200/800', alt: 'PhishRisk campaign editor', hint: 'email editor' },
        { id: 2, url: 'https://picsum.photos/seed/pr2/1200/800', alt: 'PhishRisk campaign results dashboard', hint: 'analytics dashboard' }
    ]
  },
  {
    id: 3,
    slug: "passwordleaker-pro",
    title: "PasswordLeaker PRO",
    description:
      "Check if your passwords have been compromised in known data breaches.",
    longDescription: "PasswordLeaker PRO leverages a massive database of breached credentials to help you determine if your passwords are secure. PRO users get access to our API for automated checks and deeper integrations.",
    icon: KeyRound,
    url: "/tools/passwordleaker",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi7UJYQdyLisohKiFJaPnaq169Y1lxjBcDX1eKBFoA2U8j19vvWaTkwFc0A0lBAqjm7Umf0VcrHsD91aAJz-pFzFDSx8tgm5tdrXYXfFuJpw1JTs8HnFBKc6UHaOlUT5StxqDsrG-6in4FHc0yZKrKGn7k0tVOkZRbTOuwpLvqpYTLzQjXYdzHz9vYJ_jc/s320/PasswordLeaker.png",
    screenshots: [
        { id: 1, url: 'https://picsum.photos/seed/pl1/1200/800', alt: 'PasswordLeaker PRO interface', hint: 'code interface' },
    ]
  },
  {
    id: 4,
    slug: "leakscan",
    title: "LeakScan",
    description: "Continuously scan public code repositories for accidental secret leaks.",
    longDescription: "LeakScan integrates with your development lifecycle to automatically scan GitHub, GitLab, and other repositories for hardcoded API keys, passwords, and other secrets before they can be exploited by malicious actors.",
    icon: Scan,
    url: "/tools/leakscan",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgHKHiRNvCifFGey2MkZi5URT_W0HnGJjmgv-bASQy7RcXMSLPSedhxIcn_5JCjQWEDAZhQ2XKiPeLzXUbOrmJv8L3y_CSShjw5gGk6KmUZ6jdnLAoMsyY4orfN3SFnebPVdsTer2RmVgQ6YpPxZQS0XWD3Lia-6FgLPq-ItuDQ3uue1amlsRAhFDZKjiE/s320/Leakscan.png",
    screenshots: [
        { id: 1, url: 'https://picsum.photos/seed/ls1/1200/800', alt: 'LeakScan results table', hint: 'data table' }
    ]
  },
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

export const caseStudies = [
    {
        id: 1,
        slug: "secure-finance-portal",
        title: "Securing a Major FinTech Platform",
        summary: "We overhauled a legacy banking portal, eliminating critical vulnerabilities and achieving a 99.8% reduction in penetration test findings.",
        imageUrl: "https://picsum.photos/seed/cs1/600/400",
        imageHint: "server room",
    },
    {
        id: 2,
        slug: "healthcare-data-lockdown",
        title: "Healthcare Data Lockdown",
        summary: "Post-breach, we re-architected a hospital's patient data system, implementing end-to-end encryption and strict access controls to meet HIPAA compliance.",
        imageUrl: "https://picsum.photos/seed/cs2/600/400",
        imageHint: "hospital corridor",
    },
    {
        id: 3,
        slug: "ecommerce-fraud-prevention",
        title: "eCommerce Fraud Prevention",
        summary: "For a top online retailer, we developed a custom fraud detection engine that reduced chargebacks by 70% in the first quarter.",
        imageUrl: "https://picsum.photos/seed/cs3/600/400",
        imageHint: "online shopping",
    }
];

export const productShowcase = [
    {
        icon: ShieldCheck,
        title: "Network Security",
        description: "Advanced firewall and threat prevention.",
        features: ["Deep Packet Inspection", "Intrusion Prevention", "SSL Decryption"],
        cta: "Learn More"
    },
    {
        icon: Cloud,
        title: "Cloud Security",
        description: "Protect multi-cloud environments.",
        features: ["Cloud Firewall", "Container Security", "CSPM"],
        cta: "Learn More"
    },
    {
        icon: Monitor,
        title: "Endpoint Protection",
        description: "Next-gen EDR and mobile security.",
        features: ["Behavioral Analysis", "Threat Hunting", "Mobile Defense"],
        cta: "Learn More"
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
