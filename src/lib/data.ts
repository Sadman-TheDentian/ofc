import type { Service, Tool, CaseStudy } from "./types";
import {
  ShieldCheck,
  Zap,
  Code,
  Search,
  Fingerprint,
  KeyRound,
  FileCheck,
  Building,
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
    imageUrl: "https://picsum.photos/seed/s1/600/400",
    imageHint: "data center security",
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
    imageUrl: "https://picsum.photos/seed/s2/600/400",
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
    imageUrl: "https://picsum.photos/seed/s3/600/400",
    imageHint: "developer laptop code",
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
    features: {
      free: [
        "Monitor 1 domain",
        "Monthly email reports",
        "Basic credential leak detection",
      ],
      pro: [
        "Monitor up to 50 domains",
        "Real-time alerts via email & Slack",
        "Comprehensive credential leak detection",
        "Brand and keyword monitoring",
        "Historical data access",
        "API access",
      ],
    },
    screenshots: [
        {id: 1, url: 'https://picsum.photos/seed/ds1/1200/800', alt: 'DarkCheck Dashboard', hint: 'dashboard chart'},
        {id: 2, url: 'https://picsum.photos/seed/ds2/1200/800', alt: 'DarkCheck Alert Configuration', hint: 'settings form'},
        {id: 3, url: 'https://picsum.photos/seed/ds3/1200/800', alt: 'DarkCheck Leak Details', hint: 'data table'},
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
    features: {
      free: [
        "1 phishing template",
        "Campaigns for up to 25 employees",
        "Basic reporting",
      ],
      pro: [
        "Full template library access",
        "Unlimited employees",
        "Custom template builder",
        "Detailed analytics and user-level tracking",
        "Integration with LMS for automated training",
      ],
    },
    screenshots: [
        {id: 4, url: 'https://picsum.photos/seed/pr1/1200/800', alt: 'PhishRisk Campaign Builder', hint: 'email editor'},
        {id: 5, url: 'https://picsum.photos/seed/pr2/1200/800', alt: 'PhishRisk Analytics', hint: 'analytics dashboard'},
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
    features: {
      free: ["Manual password checks", "Check against public breaches"],
      pro: [
        "Unlimited API access",
        "Check against exclusive, curated breach lists",
        "Domain-level breach monitoring",
        "Priority support",
      ],
    },
    screenshots: [
        {id: 6, url: 'https://picsum.photos/seed/pl1/1200/800', alt: 'PasswordLeaker API Usage', hint: 'code interface'},
    ]
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    slug: "fintech-ransomware-resilience",
    title: "FinTech Firm Boosts Ransomware Resilience by 95%",
    summary:
      "We conducted a full-spectrum ransomware resilience assessment for a major FinTech company, identifying critical gaps in their recovery strategy and helping them implement robust, multi-layered defenses.",
    industry: "FinTech",
    outcome: "Improved Resilience",
    imageUrl: "https://picsum.photos/seed/cs1/600/400",
    imageHint: "server room",
    content: "Detailed content about the FinTech case study...",
  },
  {
    id: 2,
    slug: "healthcare-supply-chain-secured",
    title: "Securing the Supply Chain for a Healthcare Provider",
    summary:
      "Our high-risk vendor reconnaissance uncovered significant vulnerabilities in a critical software supplier for a large hospital network, preventing a potential data breach of patient records.",
    industry: "Healthcare",
    outcome: "Breach Prevention",
    imageUrl: "https://picsum.photos/seed/cs2/600/400",
    imageHint: "hospital corridor",
    content: "Detailed content about the Healthcare case study...",
  },
  {
    id: 3,
    slug: "ecommerce-platform-lockdown",
    title: "E-commerce Platform Lockdown",
    summary:
      "Following a security incident, we rebuilt a popular e-commerce site from the ground up with secure development practices, eliminating common vulnerabilities and restoring customer trust.",
    industry: "E-commerce",
    outcome: "Secure Development",
    imageUrl: "https://picsum.photos/seed/cs3/600/400",
    imageHint: "online shopping",
    content: "Detailed content about the E-commerce case study...",
  },
];
