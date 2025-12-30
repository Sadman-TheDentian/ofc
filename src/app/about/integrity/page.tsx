'use client';

import AboutSubpageClient from "../AboutSubpageClient";

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
        <AboutSubpageClient
            title="SOVEREIGN"
            subtitle="TRUST"
            description="Integrity is the heart of DentiSystems. In a world of volatility, trust is our most robust architectural foundation."
            heroImage={heroImage}
            icon="Shield"
            tag="ETHICS // GOVERNANCE"
            mainPoints={ethicsPoints}
            secondaryTitle="CONFIDENTIALITY_METRICS"
            secondaryPoints={confidentialityPoints}
            secondaryIcon="Gavel"
        />
    );
}
