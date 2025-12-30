
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "System Assets | DentiSystems Instrument Collection",
    description: "Browse our proprietary suite of security instruments engineered for absolute digital sovereignty.",
    openGraph: {
        title: "DentiSystems System Assets",
        description: "Proprietary security instruments for absolute digital sovereignty.",
    }
};

export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
