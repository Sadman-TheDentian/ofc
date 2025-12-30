
import CareersClient from "./CareersClient";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Join the Collective | Careers | DentiSystems",
    description: "Scouting for specialized intelligence units. Join DentiSystems and contribute to the sovereign network of architects, researchers, and hunters.",
};

export default function CareersPage() {
    return <CareersClient />;
}
