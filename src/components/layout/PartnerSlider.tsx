import { partners } from "@/lib/partners";
import { cn } from "@/lib/utils";

export default function PartnerSlider() {
  const allPartners = [...partners, ...partners];

  return (
    <div
      className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
    >
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_svg]:h-10 animate-scroll">
        {allPartners.map((partner, index) => (
          <li key={index} className="flex-shrink-0">
            <partner.logo className="h-10 w-auto text-muted-foreground transition-colors hover:text-foreground" />
          </li>
        ))}
      </ul>
    </div>
  );
}
