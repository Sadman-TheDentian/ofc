
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Intel Archive | DentiSystems Research & Reports",
    description: "Deep-dives into offensive security, threat intelligence, and the future of digital sovereignty.",
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
