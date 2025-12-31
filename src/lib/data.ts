
import type { Service, Tool } from "./types";


export const services: Service[] = [
  {
    id: 1,
    slug: "high-risk-vendor-recon",
    title: "High-Risk Vendor Recon",
    headline: "Uncover Hidden Supply Chain Risks",
    description:
      "We identify and analyze your high-risk vendors to uncover potential breach points and supply chain vulnerabilities.",
    longDescription:
      "Our High-Risk Vendor Reconnaissance service provides an in-depth analysis of your third-party ecosystem. We meticulously map out your supply chain, identifying vendors with access to sensitive data and systems. Using a combination of OSINT, dark web monitoring, and proprietary techniques, we assess their security posture, uncovering misconfigurations, leaked credentials, and past breaches. This proactive approach allows you to address supply chain risks before they escalate into costly incidents, ensuring your entire operational pipeline remains secure.",
    icon: "ShieldCheck",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgQSRzyjF-_g0LnSdNoxY338BBlMxBE78y6EU_6sDeLZQEx5p1nZy6aWT847p0omh0RRcvpUxYzk9WBQlGDvPxRUi19XaOIvPmsxiR2itZU8TuTOxlAcnUVz47EJLy7KRQe4GTt6jblQ3OjiPj_ploYeHMyGBiWWOLOtpXjx3tO-ya9xiFjQq8qBGFG2is/w634-h355/High-Risk%20Vendor%20Recon.jpg",
    imageHint: "data security",
    challenge: {
      title: "Your Security is Only as Strong as Your Weakest Link",
      description: "A single compromised vendor can lead to a full-scale breach of your own systems. Traditional security measures often overlook the vast, interconnected network of third-party suppliers, creating critical blind spots.",
      stat: "60%",
      statLabel: "of breaches originate from third-party vendors"
    },
    capabilities: [
      { icon: "Target", title: "Vendor Risk Scoring", description: "We quantitatively score your vendors based on their security posture and access level." },
      { icon: "Shield", title: "Attack Surface Mapping", description: "Identifying all exposed assets and potential entry points associated with your vendors." },
      { icon: "Eye", title: "Dark Web Monitoring", description: "Continuously searching for leaked credentials or sensitive data related to your supply chain." }
    ],
    approach: [
      { step: 1, title: "Discovery & Mapping", description: "We work with you to identify all vendors and map their data access and integrations." },
      { step: 2, title: "External Reconnaissance", description: "Our team conducts deep OSINT and technical scans to build a risk profile for each vendor." },
      { step: 3, title: "Analysis & Reporting", description: "We deliver a comprehensive report detailing vulnerabilities, risk scores, and actionable remediation steps." },
      { step: 4, title: "Continuous Monitoring", description: "Ongoing monitoring provides real-time alerts for new risks emerging in your supply chain." }
    ],
    socialProof: {
      quote: "The DentiSystems reconnaissance protocol identified critical supply-chain blind spots within our third-party infrastructure. Their depth of analysis saved us from a multi-layer breach.",
      author: "Unit Directive 04-B",
      company: "Sector: Logistics & Global Sovereignty"
    }
  },
  {
    id: 2,
    slug: "vulnerability-assessment",
    title: "Vulnerability Assessment",
    headline: "Comprehensive Testing to Fortify Your Defenses",
    description:
      "Comprehensive testing to identify, classify, and remediate vulnerabilities across your digital assets.",
    longDescription:
      "DentiSystems' Vulnerability Assessment service is designed to rigorously test and validate your security controls. Our expert team conducts realistic penetration tests to identify exploitable vulnerabilities in your network, applications, and cloud infrastructure. We provide a detailed report with actionable recommendations to help you prioritize and fix weaknesses before they can be exploited by attackers.",
    icon: "Zap",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjtbBCKuZskvSJPiQYyaPMimovP5jgPOcsmUYtZS1JzbbiloKv5z39TYUYSVYVQ3LgGvi8aW_l8oKUBolxG3nrLiJzvnzqbXCPVI4Xa1pLZrTTQ1eFUyIQ3neGm4jz6v6V_UeSumgcCG1Kh3YMxI5gA_Ws2ZzZHNjpxOmTI7kIb3P-FhixMA0DrRf16RN4/w641-h358/Assurance%20Services.jpg",
    imageHint: "security shield technology",
    challenge: {
      title: "You Can't Protect What You Can't See",
      description: "Without regular, in-depth testing, hidden vulnerabilities can linger in your systems for months or even years, providing an open door for attackers. Annual check-ups are no longer sufficient in today's threat landscape.",
      stat: "250+",
      statLabel: "days is the average time to identify a breach"
    },
    capabilities: [
      { icon: "Network", title: "Network Penetration Testing", description: "Simulating real-world attacks to find weaknesses in your internal and external network infrastructure." },
      { icon: "Smartphone", title: "Web & Mobile App Testing", description: "In-depth security testing for your web and mobile applications to uncover flaws like injection, XSS, and broken authentication." },
      { icon: "Cloud", title: "Cloud Security Assessment", description: "Reviewing your cloud configuration (AWS, Azure, GCP) for misconfigurations and security gaps." }
    ],
    approach: [
      { step: 1, title: "Scoping & Reconnaissance", description: "We define the testing scope and gather information about your systems, just as a real attacker would." },
      { step: 2, title: "Scanning & Enumeration", description: "Using automated tools and manual techniques to identify potential vulnerabilities and map the attack surface." },
      { step: 3, title: "Exploitation & Analysis", description: "Our experts attempt to safely exploit identified vulnerabilities to confirm their impact and severity." },
      { step: 4, title: "Reporting & Remediation", description: "We provide a comprehensive report with prioritized findings and clear, actionable steps for remediation." }
    ],
    socialProof: {
      quote: "The technical audit delivered by DentiSystems was the most exhaustive engineering review in our operation's history. Results were actionable, deterministic, and highly accurate.",
      author: "Engineering Lead",
      company: "Sector: Institutional Finance"
    }
  },
  {
    id: 3,
    slug: "secure-web-development",
    title: "Secure Web Development",
    headline: "Build Resilient Applications, Faster",
    description:
      "Custom web engineering with security baked in from the ground up, reducing your operational risk.",
    longDescription:
      "We build high-performance, scalable web applications with a security-first mindset. Our development lifecycle integrates security at every stage, from threat modeling and secure coding practices to continuous security testing and infrastructure hardening. By embedding security into the DNA of your applications, we help you launch products faster without compromising on safety. Whether it's a customer-facing portal or a critical internal tool, we deliver web solutions that are resilient by design, protecting your data and your reputation.",
    icon: "Code",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhoYBuNJZrtHawM4IQz4mkVoZ00kqNBXFiIPAD7QEkUHD_gYdPrwHtuT207KaHeeKz0RaR0_DpNPKVScb9i03CBr3VTb5NsrSYJHpIRS4EiQp4l9pUKsfZmAyXylodtOShXS3-O5qJ-Fjttbx6ZnBrkAbziSdzcPiV0vBpOQXyE5o7wFb-5RYibkwAazic/w629-h352/Secure%20Web%20Development.jpg",
    imageHint: "developer laptop code",
    challenge: {
      title: "The Pressure to Ship vs. The Need to Be Secure",
      description: "In a fast-paced development environment, security is often treated as an afterthought, leading to vulnerabilities that are costly to fix post-deployment. This technical debt creates significant operational and reputational risk.",
      stat: "100x",
      statLabel: "more expensive to fix a bug in production than during design."
    },
    capabilities: [
      { icon: "FileCode", title: "Secure by Design Architecture", description: "We design application and cloud architecture with security principles like least privilege and defense-in-depth." },
      { icon: "Scan", title: "DevSecOps Integration", description: "Automating security testing (SAST, DAST) directly into your CI/CD pipeline for rapid feedback." },
      { icon: "Users", title: "Developer Security Training", description: "Upskilling your team with secure coding best practices to prevent vulnerabilities at the source." }
    ],
    approach: [
      { step: 1, title: "Threat Modeling Workshop", description: "We identify potential threats and design security controls before development begins." },
      { step: 2, title: "Secure Coding & PR Reviews", description: "Our engineers build your application, with every pull request undergoing a security-focused code review." },
      { step: 3, title: "Pre-Deployment Pentesting", description: "A final manual penetration test is conducted in a staging environment to catch any remaining issues." },
      { step: 4, title: "Secure Infrastructure & Handover", description: "We deploy the application on hardened infrastructure and provide full documentation and training." }
    ],
    socialProof: {
      quote: "DentiSystems didn't just build a solution; they evolved our entire secure development lifecycle. Their architecture is a fundamental shift in how we approach software sovereignty.",
      author: "Lead Architect",
      company: "Sector: SaaS Infrastructure"
    }
  },
  {
    id: 4,
    slug: "incident-response-forensics",
    title: "Incident Response & Forensics",
    headline: "Rapid Response to Minimize Breach Impact",
    description:
      "Rapid response to security breaches to minimize damage, recover data, and identify the root cause.",
    longDescription:
      "When a security incident occurs, time is critical. Our Incident Response & Forensics team provides rapid, expert assistance to contain the threat, eradicate the attacker's presence, and restore your systems to normal. We conduct detailed digital forensic investigations to understand the attack vector, determine the extent of the breach, and gather evidence for legal action. Our goal is to not only resolve the immediate crisis but also to provide you with the insights needed to prevent future incidents.",
    icon: "Siren",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEitdckfgici7gt_cQw1iNaEULPtjFOOffZJ7NSzMqcNns90531Ep5zXqcDuXVff0OtSmkpfHHM17CF7qU8ZPU7ZUBAWhiy-aj_PrlukTmYNaWpDhuU7yQibjdtPVt9ui1f5ckzOCwyQNe5bdH2jD260h1Y3-EAHWFsHip2fvxTuB9E4-rw-CJ29sEJr_YA/w631-h353/Incident%20Response%20&%20Forensics.jpg",
    imageHint: "emergency server room",
    challenge: {
      title: "Every Second Counts During a Breach",
      description: "An uncontained security incident can quickly escalate from a minor issue to a catastrophic event, leading to data loss, financial ruin, and irreparable brand damage. A slow or ineffective response is often worse than the initial attack.",
      stat: "$4.35M",
      statLabel: "average cost of a data breach in 2023."
    },
    capabilities: [
      { icon: "Zap", title: "24/7 Emergency Response", description: "Our team is on standby to help you contain threats and manage incidents at a moment's notice." },
      { icon: "Server", title: "Digital Forensics", description: "We preserve and analyze digital evidence to understand the full scope of the attack and support recovery." },
      { icon: "Shield", title: "Threat Eradication", description: "We hunt down and remove the adversary from your network to prevent re-infection and further damage." }
    ],
    approach: [
      { step: 1, title: "Containment", description: "Our first priority is to stop the bleeding by isolating affected systems and preventing further attacker movement." },
      { step: 2, title: "Investigation", description: "We conduct a thorough forensic analysis to determine the root cause, timeline, and scope of the incident." },
      { step: 3, title: "Eradication", description: "We systematically remove all attacker artifacts, backdoors, and persistence mechanisms from your environment." },
      { step: 4, title: "Recovery & Hardening", description: "We help you safely restore operations and implement security enhancements to prevent a recurrence." }
    ],
    socialProof: {
      quote: "During a high-criticality incident, DentiSystems established containment within hours. Their forensics were absolute, allowing for a 100% recovery rate without data loss.",
      author: "System Administrator",
      company: "Sector: Advanced Manufacturing"
    }
  },
];

export const tools: Tool[] = [
  {
    id: 5,
    slug: "darkcheck",
    title: "DarkCheck",
    description: "Scan the dark web for email and password leaks.",
    longDescription: "DarkCheck is a free tool that scans public data breaches and dark web marketplaces to see if your credentials have been compromised, helping you stay ahead of account takeovers.",
    icon: "KeyRound",
    url: "https://darkcheck.denti.systems",
    imageUrl: "/images/tools/darkcheck.svg",
  },
  {
    id: 6,
    slug: "leakscan",
    title: "LeakScan",
    description: "Discover exposed assets and sensitive information.",
    longDescription: "LeakScan performs a comprehensive scan of a domain to find exposed login pages, sensitive files, and other information that could be leveraged by attackers.",
    icon: "ShieldHalf",
    url: "https://leakscan.denti.systems",
    imageUrl: "/images/tools/leakscan.svg",
  },
  {
    id: 7,
    slug: "phishrisk",
    title: "PhishRisk",
    description: "Assess the phishing risk score of any domain.",
    longDescription: "PhishRisk analyzes domain registration data, SSL certificates, and other factors to generate a phishing risk score, helping you identify potentially malicious websites.",
    icon: "Siren",
    url: "https://phishrisk.denti.systems",
    imageUrl: "/images/tools/phishrisk.svg",
  },
  {
    id: 8,
    slug: "passwordleaker",
    title: "Password Leaker",
    description: "Check if your passwords have been leaked in data breaches.",
    longDescription: "Password Leaker allows you to securely check if your passwords have appeared in known data breaches, using k-anonymity to protect your privacy.",
    icon: "Code",
    url: "https://passwordleaker.denti.systems",
    imageUrl: "/images/tools/passwordleaker.svg",
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
    imageUrl: "https://images.unsplash.com/photo-1518434779774-d94213f80c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwYXJjaGl0ZWN0dXJlJTIwZGlhZ3JhbXxlbnwwfHx8fDE3NTg2MDM4MTh8MA&ixlib-rb-4.1.0&q=80&w=1080",
    imageHint: "network architecture diagram"
  },
];




