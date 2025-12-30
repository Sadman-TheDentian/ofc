
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Service Economics | DentiSystems Subscription Models",
    description: "Advanced protocol scaling for independent researchers, elite operators, and sovereign entities.",
};

export default function PricingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
