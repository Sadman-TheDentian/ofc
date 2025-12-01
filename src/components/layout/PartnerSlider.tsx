
'use client'
import Link from "next/link";
import Image from "next/image";
import { Partner as SanityPartner, SanityImage } from "@/lib/types";
import { urlFor } from "@/lib/sanity-client";


export default function PartnerSlider({ partners }: { partners: SanityPartner[] }) {
    
  if (!partners || partners.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        Loading partners...
      </div>
    );
  }

  // Duplicate the partners array for a seamless, infinite scrolling effect
  const extendedPartners = [...partners, ...partners];

  return (
    <div
      className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
    >
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 animate-scroll">
        {extendedPartners.map((partner, index) => {
          const logoUrl = partner.logo ? urlFor(partner.logo as SanityImage)?.width(200).height(80).url() : '';
          return (
            <li key={`${partner._id}-${index}`} className="flex-shrink-0">
              <Link href={partner.website || '#'} target="_blank" rel="noopener noreferrer" className="grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                {logoUrl && 
                  <Image 
                    src={logoUrl} 
                    alt={partner.name} 
                    width={160} 
                    height={64}
                    className="h-10 w-auto object-contain"
                  />
                }
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  );
}
