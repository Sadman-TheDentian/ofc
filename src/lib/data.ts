
import type { Service, Tool } from "./types";
import {
  ShieldCheck,
  Zap,
  Code,
  Search,
  Fingerprint,
  KeyRound,
  FileText,
  Scan,
  Shield,
  ShieldHalf,
} from "lucide-react";
import { PlaceHolderImages } from "./placeholder-images";

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
    imageUrl: PlaceHolderImages.find(p => p.id === 's1')?.imageUrl || "https://picsum.photos/seed/s1/800/500",
    imageHint: PlaceHolderImages.find(p => p.id === 's1')?.imageHint || "data security",
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
    imageUrl: PlaceHolderImages.find(p => p.id === 's2')?.imageUrl || "https://picsum.photos/seed/s2/800/500",
    imageHint: PlaceHolderImages.find(p => p.id === 's2')?.imageHint || "network infrastructure",
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
    imageUrl: PlaceHolderImages.find(p => p.id === 's3')?.imageUrl || "https://picsum.photos/seed/s3/800/500",
    imageHint: PlaceHolderImages.find(p => p.id === 's3')?.imageHint || "developer laptop code",
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
        { id: 1, url: PlaceHolderImages.find(p => p.id === 'ds1')?.imageUrl || "https://picsum.photos/seed/ds1/1200/800", alt: "DarkCheck Dashboard", hint: "dashboard chart" },
        { id: 2, url: PlaceHolderImages.find(p => p.id === 'ds2')?.imageUrl || "https://picsum.photos/seed/ds2/1200/800", alt: "DarkCheck Settings", hint: "settings form" },
    ],
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
        { id: 1, url: PlaceHolderImages.find(p => p.id === 'pr1')?.imageUrl || "https://picsum.photos/seed/pr1/1200/800", alt: "PhishRisk Campaign Editor", hint: "email editor" },
        { id: 2, url: PlaceHolderImages.find(p => p.id === 'pr2')?.imageUrl || "https://picsum.photos/seed/pr2/1200/800", alt: "PhishRisk Analytics", hint: "analytics dashboard" },
    ],
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
        { id: 1, url: PlaceHolderImages.find(p => p.id === 'pl1')?.imageUrl || "https://picsum.photos/seed/pl1/1200/800", alt: "PasswordLeaker PRO Interface", hint: "code interface" },
    ],
    features: {
      free: ["Manual password checks", "Check against public breaches"],
      pro: [
        "Unlimited API access",
        "Check against exclusive, curated breach lists",
        "Domain-level breach monitoring",
        "Priority support",
      ],
    },
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
        { id: 1, url: PlaceHolderImages.find(p => p.id === 'ls1')?.imageUrl || "https://picsum.photos/seed/ls1/1200/800", alt: "LeakScan results table", hint: "data table" },
    ],
    features: {
      free: ["Scan public repositories", "On-demand manual scans", "Email notifications"],
      pro: ["Scan private repositories", "Automated commit scanning", "CI/CD integration", "Slack & Jira alerts"],
    },
  },
  {
    id: 5,
    slug: "autopolicy",
    title: "AutoPolicy",
    description: "Generate and manage security policies using AI-powered templates.",
    longDescription: "AutoPolicy simplifies the complex task of creating and maintaining security policies. Use our AI to generate policies for SOC 2, ISO 27001, and other frameworks, and manage them all in one place.",
    icon: FileText,
    url: "/tools/autopolicy",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhK0uWmz1tUjhbMw3A2jYEKltD0eexaMF5nF9ov4oaW2XuLTQMrj0l7X3AUPvM7clmu2ktpFCHE1NgJHB77D2AWrca-sotoF7D7jjG7fNxnUeuNmYx8-RKh7lV_Ki7aLROz4ta7BXdxRvLwEz4-hXGmPMgxbZN3u_frcaH0e9aLcK53PaxpzwD_ioBwlW8/s320/AutoPolicy.png",
    features: {
      free: ["Access to basic policy templates", "Generate 1 policy", "Manual updates"],
      pro: ["Full access to all compliance frameworks", "Unlimited policy generation", "AI-assisted policy updates", "Version control"],
    },
  },
  {
    id: 6,
    slug: "code-scanner",
    title: "AI Code Vulnerability Scanner",
    description: "Use AI to analyze code snippets for common security vulnerabilities.",
    longDescription: "Our AI-powered Code Vulnerability Scanner allows developers to quickly check their code for issues like SQL Injection, XSS, and more. Get instant feedback and suggestions for remediation directly in your workflow.",
    icon: ShieldHalf,
    url: "/tools/code-scanner",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgC1T9VEOh8KS203i5YYu12JL6YCG05OG9sx842IhkPl2jtLXNmkHmsl3aesCEWEvmrx1pOIb7Lof2YW-aYHZ-1Ccs4wbr6jxIbKqOVHIPYyHf4p8r6plyAsfrY7Kork98eFxZLQgT8teoUefQiukF_o8xI51HdNJYkavpZtjFzuP9NpbLjxvaEc_pjEKU/s320/DentiScan.png",
    screenshots: [
        { id: 1, url: PlaceHolderImages.find(p => p.id === 'cvs1')?.imageUrl || "https://picsum.photos/seed/cvs1/1200/800", alt: "Code scanner interface", hint: "code editor" },
    ],
    features: {
      free: ["Scan up to 50 snippets per day", "Detects OWASP Top 10 vulnerabilities"],
      pro: ["Unlimited scans via UI and API", "Broader range of vulnerability checks", "CI/CD integration options"],
    },
  },
  {
    id: 7,
    slug: "code-leak-detector",
    title: "AI Code Leak Detector",
    description: "Use AI to analyze code snippets for hardcoded secrets.",
    longDescription: "Our AI-powered Code Leak Detector allows developers to quickly check their code for accidentally hardcoded secrets like API keys and passwords.",
    icon: KeyRound,
    url: "/tools/code-leak-detector",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgC1T9VEOh8KS203i5YYu12JL6YCG05OG9sx842IhkPl2jtLXNmkHmsl3aesCEWEvmrx1pOIb7Lof2YW-aYHZ-1Ccs4wbr6jxIbKqOVHIPYyHf4p8r6plyAsfrY7Kork98eFxZLQgT8teoUefQiukF_o8xI51HdNJYkavpZtjFzuP9NpbLjxvaEc_pjEKU/s320/DentiScan.png",
    screenshots: [
        { id: 1, url: PlaceHolderImages.find(p => p.id === 'cld1')?.imageUrl || "https://picsum.photos/seed/cld1/1200/800", alt: "Code leak detector interface", hint: "code editor" },
    ],
    features: {
      free: ["Scan up to 50 snippets per day", "Detects common secret patterns"],
      pro: ["Unlimited scans via UI and API", "Broader range of secret detection", "CI/CD integration options"],
    },
  }
];

export const caseStudies = [
    {
        id: 1,
        slug: "secure-finance-portal",
        title: "Securing a Major FinTech Platform",
        summary: "We overhauled a legacy banking portal, eliminating critical vulnerabilities and achieving a 99.8% reduction in penetration test findings.",
        imageUrl: PlaceHolderImages.find(p => p.id === 'cs1')?.imageUrl || "https://picsum.photos/seed/cs1/600/400",
        imageHint: PlaceHolderImages.find(p => p.id === 'cs1')?.imageHint || "server room",
    },
    {
        id: 2,
        slug: "healthcare-data-lockdown",
        title: "Healthcare Data Lockdown",
        summary: "Post-breach, we re-architected a hospital's patient data system, implementing end-to-end encryption and strict access controls to meet HIPAA compliance.",
        imageUrl: PlaceHolderImages.find(p => p.id === 'cs2')?.imageUrl || "https://picsum.photos/seed/cs2/600/400",
        imageHint: PlaceHolderImages.find(p => p.id === 'cs2')?.imageHint || "hospital corridor",
    },
    {
        id: 3,
        slug: "ecommerce-fraud-prevention",
        title: "eCommerce Fraud Prevention",
        summary: "For a top online retailer, we developed a custom fraud detection engine that reduced chargebacks by 70% in the first quarter.",
        imageUrl: PlaceHolderImages.find(p => p.id === 'cs3')?.imageUrl || "https://picsum.photos/seed/cs3/600/400",
        imageHint: PlaceHolderImages.find(p => p.id === 'cs3')?.imageHint || "online shopping",
    }
];
