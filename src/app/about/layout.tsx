
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "The Collective | About DentiSystems",
    description: "Specialized intelligence architects redesigning the boundaries of digital sovereignty.",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
