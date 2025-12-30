
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SafeImage from "@/components/SafeImage";
import { CaseStudy, SanityImage } from "@/lib/types";
import { client, urlFor } from "@/lib/sanity-client";
import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { ArrowLeft, Target, ShieldCheck, Zap, Activity } from "lucide-react";

async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
    const query = groq`*[_type == "caseStudy" && slug.current == $slug][0]`;
    return await client.fetch(query, { slug });
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
    const study = await getCaseStudy(params.slug);

    if (!study) {
        notFound();
    }

    const imageUrl = study.mainImage ? urlFor(study.mainImage as SanityImage)?.url() : undefined;

    return (
        <div className="min-h-screen bg-black pt-40 pb-20 overflow-hidden">
            <div className="container px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Back Button */}
                    <Link href="/case-studies" className="group flex items-center gap-3 text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mb-16 hover:text-[#00FF41] transition-colors">
                        <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-2 transition-transform" />
                        BAK_TO_ARCHIVES
                    </Link>

                    <header className="mb-24">
                        <div className="flex items-center gap-6 mb-8 text-[9px] font-bold text-[#00FF41] uppercase tracking-[0.6em]">
                            <Target className="h-4 w-4" />
                            MISSION_REPORT // {study.industry}
                        </div>
                        <h1 className="text-6xl md:text-9xl font-[900] tracking-tighter text-white uppercase italic leading-none mb-12">
                            {study.title}
                        </h1>
                        <div className="h-px w-full bg-gradient-to-r from-[#00FF41]/40 via-white/5 to-transparent" />
                    </header>

                    <div className="relative h-[600px] w-full mb-24 rounded-[4rem] overflow-hidden border border-white/5 bg-white/[0.02] group">
                        <SafeImage
                            src={imageUrl}
                            alt={study.title}
                            fill
                            className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                        {/* Architectural Overlay */}
                        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                            <div className="space-y-4">
                                <div className="text-[10px] font-bold text-white tracking-[0.4em] uppercase opacity-40">Operational_Focus</div>
                                <div className="text-2xl font-black text-white uppercase italic tracking-tight">{study.industry}</div>
                            </div>
                            <div className="h-16 w-16 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-xl">
                                <Activity className="h-6 w-6 text-[#00FF41]" />
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-24 items-start">
                        <div className="lg:col-span-2">
                            <div className="prose prose-invert prose-lg max-w-none 
                                prose-p:text-white/40 prose-p:font-light prose-p:leading-relaxed 
                                prose-h2:text-4xl prose-h2:font-black prose-h2:italic prose-h2:uppercase prose-h2:tracking-tighter prose-h2:text-white prose-h2:mt-24 prose-h2:mb-8
                                prose-strong:text-white prose-strong:font-bold
                                prose-ul:text-white/40 prose-li:mb-4
                            ">
                                {study.content && <PortableText value={study.content} />}
                            </div>
                        </div>
                        <aside className="sticky top-40">
                            <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-12 backdrop-blur-3xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-[0.03] scale-150 rotate-12">
                                    <ShieldCheck className="h-32 w-32 text-white" />
                                </div>
                                <h3 className="text-xl font-black text-[#00FF41] uppercase italic tracking-tight mb-8 flex items-center gap-3">
                                    <Zap className="h-5 w-5" />
                                    MISSION_OUTCOME
                                </h3>
                                <div className="text-white/40 text-sm font-light leading-relaxed italic border-l-2 border-[#00FF41]/20 pl-6">
                                    {study.outcome}
                                </div>

                                <div className="mt-12 pt-12 border-t border-white/5 flex flex-col gap-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[8px] font-bold text-white/20 tracking-widest uppercase">Status</span>
                                        <span className="text-[8px] font-bold text-[#00FF41] tracking-widest uppercase">RESOLVED</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[8px] font-bold text-white/20 tracking-widest uppercase">Confidentiality</span>
                                        <span className="text-[8px] font-bold text-white tracking-widest uppercase">LEVEL_ALPHA</span>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>

                </div>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    const studies = await client.fetch<CaseStudy[]>(groq`*[_type == "caseStudy"]{"slug": slug.current}`);
    return studies.map(study => ({ slug: study.slug.current }));
}
