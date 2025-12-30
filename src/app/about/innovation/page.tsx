'use client';

import AboutSubpageClient from "../AboutSubpageClient";

const heroImage = "https://blogger.googleusercontent.com/img/a/AVvXsEgKyvpArELsyfOnQb0iNOF8rSx2neMBe-gD0S7zAsKHKDdp2GTkOBhtRsto8gf07eXLfFhIou6L_X1_-bHuodabFPNHPCcHfgTOrqeOx3BQ0cHZgODohBHz1qPoY1KV42fKBtS9qRu7xQyChHv4dn3uA2QdwtgrVIHSnEi43eSSPsXZlOks59jRJelRbHo=w635-h354";

const rndPoints = [
    "New detection algorithms",
    "Zero-day exploit analysis",
    "Quantum-resilient models",
    "Automated threat prediction",
    "AI-driven attack simulations"
];

const aiPoints = [
    "Predictive threat modeling",
    "Automated response actions",
    "Behavioral anomaly detection",
    "Real-time risk scoring",
    "Intelligent malware analysis"
];

export default function InnovationPage() {
    return (
        <AboutSubpageClient
            title="FUTURE"
            subtitle="FORGED"
            description="The cyber battlefield never sleeps. Threat actors innovate every day—so we architect the future to stay lightyears ahead."
            heroImage={heroImage}
            icon="Zap"
            tag="EVOLUTION // RESEARCH"
            mainPoints={rndPoints}
            secondaryTitle="NEURAL_MODELS"
            secondaryPoints={aiPoints}
            secondaryIcon="Workflow"
        />
    );
}
