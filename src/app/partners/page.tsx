import { client } from "@/lib/sanity-client";
import type { Partner } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import type { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import { SanityImageSource } from "sanity";

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource): ImageUrlBuilder {
  return builder.image(source);
}

async function getPartners(): Promise<Partner[]> {
  const query = `*[_type == "partner"]{
    _id,
    name,
    website,
    logo
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function PartnersPage() {
  const partners = await getPartners();
  
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center space-y-4 mb-12 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
          Our Partners
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
          We collaborate with industry leaders to deliver best-in-class security solutions and drive innovation.
        </p>
      </div>

      {partners && partners.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {partners.map(partner => (
                 <Link key={partner._id} href={partner.website || '#'} target="_blank" rel="noopener noreferrer" className="group">
                  <Card className="h-48 flex items-center justify-center p-6 border-border transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 rounded-xl hover:-translate-y-2 bg-gradient-to-br from-card to-card/80 border-border/50">
                     <Image
                        src={urlFor(partner.logo).height(60).url()!}
                        alt={partner.name}
                        width={200}
                        height={60}
                        className="h-12 lg:h-16 w-auto object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                      />
                  </Card>
                </Link>
            ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed rounded-lg">
          <h3 className="font-headline text-xl font-semibold">No Partners Found</h3>
          <p className="text-muted-foreground mt-2">Use the Sanity Studio to add new partners to your ecosystem.</p>
        </div>
      )}
    </div>
  );
}
