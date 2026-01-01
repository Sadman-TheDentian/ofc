
'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Building, Loader2, MessageSquare, ArrowRight, ShieldCheck, Globe } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { submitInquiry } from "./actions";
import { motion } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import TechnicalIcon from "@/components/TechnicalIcon";

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    company: z.string().optional(),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(1000, { message: "Message must be under 1000 characters." }),
});

import GlitchText from "@/components/GlitchText";
import RevealText from "@/components/RevealText";

export default function ContactPage() {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            company: "",
            message: "",
        },
    });

    const { isSubmitting } = form.formState;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const result = await submitInquiry(values);
            if (result.success) {
                toast({
                    title: "PROTOCOL INITIATED",
                    description: "Your inquiry has been encrypted and transmitted successfully.",
                });
                form.reset();
            } else {
                toast({
                    variant: "destructive",
                    title: "TRANSMISSION ERROR",
                    description: result.message || "Encryption failed. Please try again.",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "SYSTEM CRITICAL",
                description: "An unexpected error occurred. Please contact us via alternative channels.",
            });
        }
    }

    return (
        <div className="min-h-screen bg-black pt-24 md:pt-40 pb-20 overflow-hidden relative">
            <div className="container px-4 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 md:gap-32 items-start mb-24 md:mb-60">
                    <div className="lg:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute -top-40 -left-60 w-96 h-96 bg-[#00FF41]/5 blur-[120px] rounded-full pointer-events-none"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="relative z-10"
                        >
                            <div className="flex items-center gap-10 mb-10 md:mb-16">
                                <TechnicalIcon icon={MessageSquare} glowColor="#00FF41" className="scale-75 origin-left" />
                                <RevealText text="COMMUNICATIONS // SECURE_TELEM_LINK" className="text-[10px] font-black tracking-[1.2em] text-[#00FF41] uppercase italic" />
                            </div>
                            <h1 className="text-5xl md:text-8xl lg:text-[160px] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-12 md:mb-16">
                                <GlitchText text="ESTABLISH" /> <br /><span className="text-white/10"><GlitchText text="CONTACT." /></span>
                            </h1>
                            <p className="max-w-xl text-white/40 text-xl md:text-3xl font-light leading-relaxed mb-12 md:mb-24 italic border-l border-white/10 pl-10">
                                Open a direct line to our intelligence units for mission-critical security inquiries and high-fidelity project coordination.
                            </p>

                            <div className="space-y-16 border-l border-white/5 pl-12 relative">
                                <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-[#00FF41]/20 via-transparent to-transparent" />
                                <div className="flex items-start gap-12 group/item">
                                    <div className="relative">
                                        <div className="absolute -inset-4 bg-[#00FF41]/5 blur-xl rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                        <TechnicalIcon icon={Mail} glowColor="#00FF41" className="scale-125 transition-transform duration-500 group-hover/item:scale-150 group-hover/item:rotate-12" />
                                    </div>
                                    <div>
                                        <h4 className="text-[11px] font-black tracking-[0.5em] text-[#00FF41]/40 uppercase mb-4 italic group-hover/item:text-[#00FF41] transition-colors">DIRECT_TELEMETRY</h4>
                                        <p className="text-xl md:text-4xl font-[1000] text-white group-hover/item:translate-x-8 transition-all duration-1000 italic uppercase tracking-tighter">help@denti.systems</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-12 group/item">
                                    <div className="relative">
                                        <div className="absolute -inset-4 bg-[#00FF41]/5 blur-xl rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                        <TechnicalIcon icon={Phone} glowColor="#00FF41" className="scale-125 transition-transform duration-500 group-hover/item:scale-150 group-hover/item:rotate-[-12deg]" />
                                    </div>
                                    <div>
                                        <h4 className="text-[11px] font-black tracking-[0.5em] text-[#00FF41]/40 uppercase mb-4 italic group-hover/item:text-[#00FF41] transition-colors">LIVE_COMMAND_SYNC</h4>
                                        <p className="text-xl md:text-4xl font-[1000] text-white group-hover/item:translate-x-8 transition-all duration-1000 italic uppercase tracking-tighter">+8801308539526</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:w-1/2 w-full lg:mt-0 mt-12 relative">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.2 }}
                            className="relative"
                        >
                            <Card className="bg-white/[0.01] border border-white/5 rounded-[4rem] p-10 md:p-20 backdrop-blur-3xl relative overflow-hidden group shadow-2xl">

                                {/* HUD Hover Corners */}
                                <div className="absolute inset-0 p-12 pointer-events-none opacity-20 group-hover:opacity-100 transition-opacity duration-1000">
                                    <div className="w-full h-full border border-white/5 rounded-[3rem] group-hover:border-[#00FF41]/10 transition-colors" />
                                    <div className="absolute top-12 left-12 w-12 h-12 border-t border-l border-[#00FF41]/40" />
                                    <div className="absolute bottom-12 right-12 w-12 h-12 border-b border-r border-[#00FF41]/40" />
                                </div>

                                <div className="absolute top-0 right-0 p-16 opacity-[0.02] scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                                    <ShieldCheck className="h-60 w-60 text-[#00FF41]" />
                                </div>
                                <CardHeader className="p-0 mb-16 relative z-10">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="h-px w-10 bg-[#00FF41]" />
                                        <CardTitle className="text-4xl font-[1000] text-white uppercase italic tracking-tighter">MISSION_BRIEFING</CardTitle>
                                    </div>
                                    <CardDescription className="text-white/20 text-[10px] font-bold tracking-[0.4em] uppercase border-l border-white/10 pl-6 italic">Validation required for protocol transmission_</CardDescription>
                                </CardHeader>
                                <CardContent className="p-0 relative z-10">
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-black">
                                            <div className="grid sm:grid-cols-2 gap-8">
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input placeholder="IDENT_NAME" className="h-20 bg-white/[0.02] border border-white/5 rounded-2xl text-white placeholder:text-white/10 px-8 focus:border-[#00FF41]/60 tracking-[0.3em] uppercase font-black text-[11px] transition-all" {...field} />
                                                            </FormControl>
                                                            <FormMessage className="text-[#00FF41]/40 text-[9px] font-black tracking-widest uppercase italic mt-4" />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input placeholder="TELEMETRY_LINK" className="h-20 bg-white/[0.02] border border-white/5 rounded-2xl text-white placeholder:text-white/10 px-8 focus:border-[#00FF41]/60 tracking-[0.3em] uppercase font-black text-[11px] transition-all" {...field} />
                                                            </FormControl>
                                                            <FormMessage className="text-[#00FF41]/40 text-[9px] font-black tracking-widest uppercase italic mt-4" />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <FormField
                                                control={form.control}
                                                name="company"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input placeholder="ORGANIZATION_ENTITY" className="h-20 bg-white/[0.02] border border-white/5 rounded-2xl text-white placeholder:text-white/10 px-8 focus:border-[#00FF41]/60 tracking-[0.3em] uppercase font-black text-[11px] transition-all" {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-[#00FF41]/40 text-[9px] font-black tracking-widest uppercase italic mt-4" />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="message"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Textarea placeholder="TRANSMISSION_DATA_SUBSTRATE" className="min-h-[200px] bg-white/[0.02] border border-white/5 rounded-[2.5rem] text-white placeholder:text-white/10 p-10 focus:border-[#00FF41]/60 tracking-[0.2em] uppercase font-black text-[11px] italic transition-all leading-relaxed" {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-[#00FF41]/40 text-[9px] font-black tracking-widest uppercase italic mt-4" />
                                                    </FormItem>
                                                )}
                                            />
                                            <div className="pt-8">
                                                <Magnetic strength={0.2} className="w-full">
                                                    <Button type="submit" className="h-24 w-full rounded-full bg-white text-black font-[1000] uppercase tracking-[0.5em] text-[13px] hover:bg-[#00FF41] transition-all shadow-[0_0_80px_rgba(0,0,0,0.5)] group/btn relative overflow-hidden" disabled={isSubmitting}>
                                                        <span className="relative z-10 flex items-center justify-center gap-6">
                                                            {isSubmitting ? <Loader2 className="h-6 w-6 animate-spin" /> : "INITIATE_TRANSMISSION"}
                                                            {!isSubmitting && <ArrowRight className="h-6 w-6 group-hover/btn:translate-x-4 transition-transform duration-500" />}
                                                        </span>
                                                        <div className="absolute inset-0 bg-[#00FF41] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-700 pointer-events-none" />
                                                    </Button>
                                                </Magnetic>
                                            </div>

                                            <div className="flex justify-between items-center opacity-5 group-hover:opacity-20 transition-opacity">
                                                <span className="text-[7px] font-black tracking-widest">STATION_COMM_v6.1</span>
                                                <span className="text-[7px] font-black tracking-widest italic uppercase">RSA_ENC_ACTIVE</span>
                                            </div>
                                        </form>
                                    </Form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>

                {/* Tactical Locations Grid */}
                <div className="pt-24 md:pt-60 border-t border-white/10">
                    <div className="max-w-4xl mb-12 md:mb-32">
                        <div className="flex items-center gap-8 mb-10">
                            <TechnicalIcon icon={Globe} glowColor="#00FF41" className="scale-75 origin-left" />
                            <span className="text-[11px] font-black tracking-[1em] text-[#00FF41] block uppercase italic">GLOBAL_NETWORK_TOPOLOGY</span>
                        </div>
                        <h2 className="text-4xl md:text-8xl font-[1000] text-white uppercase italic leading-[0.8] tracking-tighter">THE <span className="text-white/10">CENTERS.</span></h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 md:gap-px bg-white/5 border border-white/5 rounded-[5rem] overflow-hidden shadow-2xl">
                        {[
                            { city: "SINGAPORE", loc: "101 Kallang Ave", type: "HQ", id: "SG_NODE_01" },
                            { city: "BANGLADESH", loc: "Jahaj Company More", type: "OPS", id: "BD_NODE_44" },
                            { city: "TEK_HUB", loc: "Mohona Tower", type: "LAB", id: "TR_NODE_09" }
                        ].map((loc, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 1 }}
                                className="p-12 md:p-20 bg-black group hover:bg-[#00FF41]/5 transition-all duration-1000 relative overflow-hidden"
                            >
                                {/* HUD Brackets */}
                                <div className="absolute top-12 left-12 w-10 h-10 border-t border-l border-white/10 group-hover:border-[#00FF41]/40 transition-colors" />

                                <div className="text-[11px] font-black text-[#00FF41] tracking-[0.5em] mb-12 uppercase flex items-center justify-between relative z-10 italic">
                                    <div className="flex items-center gap-4">
                                        <div className="h-2 w-2 bg-[#00FF41] rounded-full animate-pulse shadow-[0_0_15px_#00FF41]" />
                                        {loc.type}_UNIT
                                    </div>
                                    <span className="text-white/10 group-hover:text-[#00FF41]/40 transition-colors">{loc.id}</span>
                                </div>

                                <h4 className="text-3xl md:text-5xl font-[1000] text-white uppercase italic tracking-tighter mb-8 group-hover:translate-x-8 transition-all duration-1000 leading-none relative z-10">{loc.city}</h4>
                                <p className="text-white/20 text-xl font-light italic leading-relaxed border-l border-white/10 pl-8 group-hover:border-[#00FF41]/20 transition-colors relative z-10">{loc.loc}</p>

                                <div className="mt-16 pt-12 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 flex justify-between items-center">
                                    <span className="text-[8px] font-black tracking-[0.4em] text-[#00FF41] uppercase italic">ACTIVE_NODE_LINK</span>
                                    <Building className="h-4 w-4 text-[#00FF41] animate-bounce" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
