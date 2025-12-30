
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Command Link | Establish Contact with DentiSystems",
    description: "Secure communication channels for mission-critical security inquiries and project coordination.",
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
