'use client';

import AboutSubpageClient from "../AboutSubpageClient";

const heroImage = "https://blogger.googleusercontent.com/img/a/AVvXsEic3sHUvr_T2_6WSx-BUfO1t9T3BAAfhyiN8dWAsaEJSxP7_-c3w7RgMkF8Bbw4AYKTYrVd9HDQte7HvRjoOQKLPrlSvHOlhOK3hhLHaZQo2gGoi1eT6hznYtFfglkHqhlc3nPDRCGDNMDJhoQewbKrFoE9g5hRsKp8YPog5tabjXe1SDk-OciMupiea3M=w641-h358";

const expertiseAreas = [
    "Offensive security & red teaming",
    "Adversary simulation",
    "Threat intelligence analysis",
    "Secure-by-design software engineering",
    "Cloud & infrastructure security",
    "AI-enhanced defensive systems",
    "Digital forensics & incident response"
];

const innovationPoints = [
    "Zero-day vulnerability research",
    "Continuous R&D",
    "Deep code analysis",
    "Weekly attack simulation exercises",
    "Reverse engineering malware campaigns"
];

export default function ExpertisePage() {
    return (
        <AboutSubpageClient
            title="TACTICAL"
            subtitle="MASTERY"
            description="At DentiSystems, expertise is not a qualification—it is the engine that drives our entire mission."
            heroImage={heroImage}
            icon="Target"
            tag="CAPACITY // EXPERTISE"
            mainPoints={expertiseAreas}
            secondaryTitle="PREDICTIVE_INTEL"
            secondaryPoints={innovationPoints}
            secondaryIcon="Zap"
        />
    );
}
