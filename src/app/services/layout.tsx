
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Elite Protocols | DentiSystems Capability Recon",
    description: "Proprietary offensive and defensive methodologies engineered for absolute digital sovereignty.",
    openGraph: {
        title: "DentiSystems Elite Protocols",
        description: "Offensive research and defensive infrastructure engineering.",
    }
};

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
