
'use client'
import { client } from "@/lib/sanity";
import { type Partner } from "@/lib/types";
import { cn } from "@/lib/utils";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

export default function PartnerSlider() {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    async function fetchPartners() {
      const query = `*[_type == "partner"]{ _id, name, website, logo }`;
      const data = await client.fetch<Partner[]>(query);
      setPartners([...data, ...data]); // Duplicate for seamless scrolling
    }
    fetchPartners();
  }, []);

  if (partners.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        Loading partners...
      </div>
    );
  }

  return (
    <div
      className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
    >
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 animate-scroll">
        {partners.map((partner, index) => (
          <li key={`${partner._id}-${index}`} className="flex-shrink-0">
            <Link href={partner.website || '#'} target="_blank" rel="noopener noreferrer" className="grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
              <Image 
                src={urlFor(partner.logo).height(40).url()}
                alt={partner.name}
                width={140}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
