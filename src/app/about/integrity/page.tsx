
import Link from "next/link";
import { Check } from "lucide-react";
import ImageHero from "@/components/layout/ImageHero";

const heroImage = "https://blogger.googleusercontent.com/img/a/AVvXsEg9f_wEbICAyoTey7qzbh9tgOfpc0cQ_JSLxvHqgPG3qTA-Vzv9v_JAwgT-fS0ISQb7lpd0qLEXCEqj4jNQYDpNFgDhhTtviRBdIhcsPYuygiU98p9rzK9ax0rR8CCQPoe7xZ-AkB8zVe06pz7gVu5Q4hukRYqcEuw_uJzHdCfeEMzmHQyOjtnma3Ty-Oc=w631-h353";

const ethicsPoints = [
    "No shortcuts",
    "No hidden actions",
    "No compromise on client privacy",
    "No exaggeration or misrepresentation"
];

const confidentialityPoints = [
    "Zero-tolerance confidentiality breaches",
    "Encrypted communication practices",
    "Strict internal access controls",
    "Need-to-know data handling policies"
];

export default function IntegrityPage() {
    return (
        <div className="bg-background text-foreground">
             <ImageHero
                imageUrl={heroImage}
                title="Integrity: Trust Built Into Every Line of Code"
                description="Integrity is the heart of DentiSystems. In a world where cyber threats rise daily, trust is not optional — it is everything."
             />
            
            <main className="container max-w-4xl mx-auto py-16 px-4">
                <div className="prose prose-invert max-w-none text-foreground/90 prose-lg prose-headings:font-headline prose-headings:text-primary prose-a:text-primary prose-strong:text-foreground prose-ul:space-y-2">
                    <p>We honor that trust with absolute transparency, ethics, and respect for your data.</p>
                    
                    <h2>What Integrity Means to Us</h2>
                    
                    <h3>Ethical Security Above All</h3>
                    <p>We operate with strict professional standards in every assessment and project. Our rules are clear:</p>
                    <ul>
                        {ethicsPoints.map(point => (
                             <li key={point} className="flex items-start">
                                <Check className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                    <p>Every step we take is documented, justified, and aligned with global cybersecurity ethics.</p>

                    <h3>Your Confidentiality Is Sacred</h3>
                    <p>Your systems, your data, your vulnerabilities — we protect them with military-grade discipline. We handle every detail with discretion and enforce:</p>
                    <ul>
                         {confidentialityPoints.map(point => (
                             <li key={point} className="flex items-start">
                                <Check className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                    <p>Your trust is our responsibility — and we guard it fiercely.</p>

                    <h3>Transparency & Honesty</h3>
                    <p>We don’t hide behind technical jargon. We explain every finding with clarity, provide real solutions, and give straightforward reports. If there’s a risk — you’ll know. If there’s a solution — we build it. If there's a better way — we recommend it.</p>
                    
                    <h3>Client-First Commitment</h3>
                    <p>Our decisions are designed around one principle: Your security comes first. Even if it requires more time, more effort, or more cost on our side — we do it. Because your safety and trust are worth it.</p>

                    <h2>Our Promise</h2>
                    <p>Integrity isn’t a marketing term at DentiSystems. It is our culture, our discipline, and our identity. Security without integrity is an illusion — and we don’t deal in illusions.</p>
                </div>

                 <div className="text-center mt-16">
                    <Link href="/about" className="text-primary hover:underline">
                        ← Back to About Us
                    </Link>
                </div>
            </main>
        </div>
    );
}
