
// This file is now deprecated. Partner data is fetched from Sanity.io.
// The file is kept to prevent breaking changes but can be removed in a future refactor.

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
  logo: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};

export const partners: Partner[] = [
  {
    id: "quantum",
    name: "Quantum Inc",
    logo: QuantumIncLogo,
  },
  {
    id: "cybercorp",
    name: "CyberCorp",
    logo: CyberCorpLogo,
  },
  {
    id: "nexusguard",
    name: "NexusGuard",
    logo: NexusGuardLogo,
  },
  {
    id: "apex",
    name: "Apex Securities",
    logo: ApexSecuritiesLogo,
  },
  {
    id: "titan",
    name: "Titan Industries",
    logo: TitanIndustriesLogo,
  },
  {
    id: "novasys",
    name: "NovaSys",
    logo: NovaSysLogo,
  },
];
