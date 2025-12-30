
'use client'
import Link from "next/link";
import Image from "next/image";
import { Partner as SanityPartner, SanityImage } from "@/lib/types";
import { urlFor } from "@/lib/sanity-client";
import { motion } from "framer-motion";

export default function PartnerSlider({ partners }: { partners: SanityPartner[] }) {

  if (!partners || partners.length === 0) {
    return (
      <div className="text-center">
        <span className="text-[10px] font-black tracking-[0.6em] text-white/10 uppercase animate-pulse">
          ESTABLISHING_ALLIANCE_LINK...
        </span>
      </div>
    );
  }

  // Duplicate for seamless scroll
  const extendedPartners = [...partners, ...partners, ...partners];

  return (
    <div className="w-full relative py-12">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div
        className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_20%,_black_80%,transparent_100%)] relative z-10"
      >
        <ul className="flex items-center justify-center md:justify-start [&_li]:mx-16 animate-scroll py-8">
          {extendedPartners.map((partner, index) => {
            const logoUrl = partner.logo ? urlFor(partner.logo as SanityImage)?.width(200).height(80).url() : '';
            return (
              <li key={`${partner._id}-${index}`} className="flex-shrink-0 group">
                <Link href={partner.website || '#'} target="_blank" rel="noopener noreferrer" className="block relative">
                  <div className="absolute -inset-8 bg-white/[0.02] rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  {logoUrl &&
                    <Image
                      src={logoUrl}
                      alt={partner.name}
                      width={160}
                      height={64}
                      className="h-10 md:h-12 w-auto object-contain grayscale opacity-20 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                    />
                  }
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-max text-[7px] font-black text-[#00FF41] tracking-[0.4em] uppercase opacity-0 group-hover:opacity-40 transition-all duration-700 translate-y-2 group-hover:translate-y-0">
                    VERIFIED_NODE
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}
