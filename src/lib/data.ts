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
    url: "https://darkcheck.denti.systems",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhP0_bWguZ5wH-zwO9nWFsKIf6oJtiqyUNuF87wE7CBzUEJe7xfDLoYWtUmJaC0p1LSGHfsWkmhSn8-mH5JnYKre-LKkEl9zCC4PSmM89ke2Dg4E14yZejNEd0zGPlo_b09JMSRGBaUC3NnkkjlfU0KtATGbgmiK_PdrcgYisrwITVnOeZ420EUyg92T2w/s320/Darkcheck.png",
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
    url: "https://phishrisk.denti.systems",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjaDT7-W90QmoQPNtx9ZKZd_ZXDzjAx41rprheeshOMZ2k-0c5K4JXPkK5COAWvZcd8FU03p99VJTvBPxOS2aDYWsj3IgZ8c4X6AdS-QxQwIWeXlQ3IWl423Zwl-l7N9Rivm395N3kqigtsfPlxMY_a83BMsFbF3VvlElmmQaZGfBf6C-EM_1Ys71T4t1g/s320/PhishRisk.png",
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
    url: "https://passwordleaker.denti.systems",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi7UJYQdyLisohKiFJaPnaq169Y1lxjBcDX1eKBFoA2U8j19vvWaTkwFc0A0lBAqjm7Umf0VcrHsD91aAJz-pFzFDSx8tgm5tdrXYXfFuJpw1JTs8HnFBKc6UHaOlUT5StxqDsrG-6in4FHc0yZKrKGn7k0tVOkZRbTOuwpLvqpYTLzQjXYdzHz9vYJ_jc/s320/PasswordLeaker.png",
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
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgHKHiRNvCifFGey2MkZi5URT_W0HnGJjmgv-bASQy7RcXMSLPSedhxIcn_5JCjQWEDAZhQ2XKiPeLzXUbOrmJv8L3y_CSShjw5gGk6KmUZ6jdnLAoMsyY4orfN3SFnebPVdsTer2RmVgQ6YpPxZQS0XWD3Lia-6FgLPq-ItuDQ3uue1amlsRAhFDZKjiE/s320/Leakscan.png",
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
    url: "https://autopolicy.denti.systems",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhK0uWmz1tUjhbMw3A2jYEKltD0eexaMF5nF9ov4oaW2XuLTQMrj0l7X3AUPvM7clmu2ktpFCHE1NgJHB77D2AWrca-sotoF7D7jjG7fNxnUeuNmYx8-RKh7lV_Ki7aLROz4ta7BXdxRvLwEz4-hXGmPMgxbZN3u_frcaH0e9aLcK53PaxpzwD_ioBwlW8/s320/AutoPolicy.png",
    features: {
      free: ["Access to basic policy templates", "Generate 1 policy", "Manual updates"],
      pro: ["Full access to all compliance frameworks", "Unlimited policy generation", "AI-assisted policy updates", "Version control"],
    },
  },
  {
    id: 6,
    slug: "dentiscan",
    title: "DentiScan",
    description: "Automated vulnerability scanning for your web applications.",
    longDescription: "DentiScan provides continuous, automated security scanning for your web apps. It checks for common vulnerabilities like XSS, SQL injection, and insecure configurations, providing actionable reports to your development team.",
    icon: Shield,
    url: "https://scan.denti.systems",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgC1T9VEOh8KS203i5YYu12JL6YCG05OG9sx842IhkPl2jtLXNmkHmsl3aesCEWEvmrx1pOIb7Lof2YW-aYHZ-1Ccs4wbr6jxIbKqOVHIPYyHf4p8r6plyAsfrY7Kork98eFxZLQgT8teoUefQiukF_o8xI51HdNJYkavpZtjFzuP9NpbLjxvaEc_pjEKU/s320/DentiScan.png",
    features: {
      free: ["Monthly scans for 1 web app", "Summary-level reports", "OWASP Top 10 checks"],
      pro: ["Daily or on-demand scans", "Unlimited web apps", "Detailed vulnerability reports", "Remediation guidance", "API for CI/CD integration"],
    },
  },
];
