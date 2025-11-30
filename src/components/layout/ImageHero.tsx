"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface ImageHeroProps {
    imageUrl: string;
    title: string;
    description: string;
}

export default function ImageHero({ imageUrl, title, description }: ImageHeroProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (typeof window === 'undefined') return;

        // Dynamically import ScrollTrigger and register it
        import("gsap/ScrollTrigger").then(ScrollTriggerModule => {
            gsap.registerPlugin(ScrollTriggerModule.default);

            if (!contentRef.current || !sectionRef.current) return;

            gsap.to(contentRef.current, {
                opacity: 0,
                y: -50,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
        });

    }, { scope: contentRef });

    return (
        <section ref={sectionRef} className="relative w-full py-20 md:py-32 lg:py-40 bg-background overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover w-full h-full"
                    priority
                />
                <div className="absolute inset-0 bg-background/80" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            </div>
            <div ref={contentRef} className="container relative z-10 text-center">
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl max-w-4xl mx-auto">
                    {title}
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
                    {description}
                </p>
            </div>
        </section>
    );
}
