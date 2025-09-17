import type { Service, Tool, CaseStudy, BlogPost, Author } from "./types";
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
    embedCode: `<iframe src="https://drive.google.com/file/d/1Fkg_YYG0Vzk-nCpw9sbDGbVQ_Cw5W8um/preview" width="640" height="480" allow="autoplay"></iframe>`,
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
    embedCode: `<iframe src="https://drive.google.com/file/d/1rsIUupggFyzBtBZGOAbcclpjdnwgkZX1/preview" width="640" height="480" allow="autoplay"></iframe>`,
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
    embedCode: `<iframe src="https://drive.google.com/file/d/18er86ICas46zDB8Y4soiohWH1mPq8-wH/preview" width="640" height="480" allow="autoplay"></iframe>`,
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
    embedCode: `<iframe src="https://drive.google.com/file/d/1BfrjySc6u6c_BDWot3ggbhK47MtfTlNi/preview" width="640" height="480" allow="autoplay"></iframe>`,
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
    embedCode: `<iframe src="https://drive.google.com/file/d/15CVws9chDxxA4M_nTljXtaI58v1kS2Hc/preview" width="640" height="480" allow="autoplay"></iframe>`,
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
    embedCode: `<iframe src="https://drive.google.com/file/d/1uWSW2pUmCmq9IC2P2UAZkUmU8tnGkSPv/preview" width="640" height="480" allow="autoplay"></iframe>`,
    features: {
      free: ["Monthly scans for 1 web app", "Summary-level reports", "OWASP Top 10 checks"],
      pro: ["Daily or on-demand scans", "Unlimited web apps", "Detailed vulnerability reports", "Remediation guidance", "API for CI/CD integration"],
    },
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

const authors: { [key: string]: Author } = {
    'alex-chen': {
        name: "Alex 'Havoc' Chen",
        imageUrl: "https://picsum.photos/seed/team1/100/100",
        imageHint: "professional headshot man",
    },
    'evelyn-reed': {
        name: "Dr. Evelyn Reed",
        imageUrl: "https://picsum.photos/seed/team2/100/100",
        imageHint: "professional headshot woman",
    }
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "the-anatomy-of-a-zero-day-exploit",
    title: "The Anatomy of a Zero-Day Exploit",
    excerpt: "A deep dive into how zero-day vulnerabilities are discovered, weaponized, and deployed by threat actors in the wild.",
    imageUrl: "https://picsum.photos/seed/blog1/800/500",
    imageHint: "abstract code security",
    date: "2024-06-15",
    author: authors['evelyn-reed'],
    content: `<p>A zero-day exploit is a cyber attack that occurs on the same day a weakness is discovered in software. At that point, it's exploited before a fix becomes available from its creator.</p><p>This article explores the lifecycle of a zero-day vulnerability, from its initial discovery by security researchers or malicious actors to its eventual disclosure and patching. We will analyze recent high-profile examples and discuss the technical mechanisms that make these exploits so potent and difficult to defend against. Understanding the anatomy of these threats is the first step toward building a more resilient security posture.</p><h3>The Discovery Phase</h3><p>Zero-day vulnerabilities can be found by anyone, from independent security researchers to state-sponsored hacking groups. The initial discovery often involves techniques like fuzzing, reverse engineering, and source code analysis. Once a vulnerability is identified, its potential for exploitation is assessed.</p><h3>Weaponization and Deployment</h3><p>After discovery, the vulnerability is weaponized by creating an exploit—a piece of code designed to take advantage of the flaw. This exploit is then packaged into a delivery mechanism, such as a malicious email attachment, a compromised website, or a targeted network intrusion. The goal is to deliver the exploit to the target system and execute it to achieve the attacker's objectives, which could range from data theft to full system control.</p>`,
  },
  {
    id: 2,
    slug: "securing-your-supply-chain",
    title: "Why Your Software Supply Chain is Your Weakest Link",
    excerpt: "Your security is only as strong as your vendors. Learn how to mitigate risks from third-party software and services.",
    imageUrl: "https://picsum.photos/seed/blog2/800/500",
    imageHint: "supply chain diagram",
    date: "2024-05-28",
    author: authors['alex-chen'],
    content: `<p>In today's interconnected world, no organization operates in isolation. We rely on a complex web of third-party software, libraries, and services to build and run our applications. While this accelerates development, it also introduces significant security risks.</p><p>A vulnerability in a single open-source library or a breach at one of your SaaS providers can have a cascading effect, compromising your entire system. This is the reality of software supply chain attacks, and they are on the rise.</p><h3>Key Mitigation Strategies</h3><ul><li><strong>Vendor Risk Assessment:</strong> Before integrating any third-party service, conduct a thorough security assessment.</li><li><strong>Software Bill of Materials (SBOM):</strong> Maintain a detailed inventory of all software components and their dependencies.</li><li><strong>Continuous Monitoring:</strong> Use tools to continuously scan for vulnerabilities in your dependencies and receive alerts.</li></ul><p>By taking a proactive approach to supply chain security, you can significantly reduce your attack surface and protect your organization from this growing threat vector.</p>`,
  },
];
