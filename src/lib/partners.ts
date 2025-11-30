
import {
  QuantumIncLogo,
  CyberCorpLogo,
  NexusGuardLogo,
  ApexSecuritiesLogo,
  TitanIndustriesLogo,
  NovaSysLogo
} from "@/components/icons/Partners";
import { SVGProps } from "react";

export type Partner = {
  id: string;
  name: string;
  website?: string;
};

export const partners: Partner[] = [
  {
    id: "quantum",
    name: "Quantum Inc",
  },
  {
    id: "cybercorp",
    name: "CyberCorp",
  },
  {
    id: "nexusguard",
    name: "NexusGuard",
  },
  {
    id: "apex",
    name: "Apex Securities",
  },
  {
    id: "titan",
    name: "Titan Industries",
  },
  {
    id: "novasys",
    name: "NovaSys",
  },
];

export const partnerLogos: Record<string, (props: SVGProps<SVGSVGElement>) => JSX.Element> = {
  quantum: QuantumIncLogo,
  cybercorp: CyberCorpLogo,
  nexusguard: NexusGuardLogo,
  apex: ApexSecuritiesLogo,
  titan: TitanIndustriesLogo,
  novasys: NovaSysLogo
};
