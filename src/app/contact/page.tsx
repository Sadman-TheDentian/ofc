
'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Building, Loader2, MessageSquare, ArrowRight, ShieldCheck } from "lucide-react";
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
            <div className="container px-4">
                <div className="flex flex-col lg:flex-row gap-16 md:gap-32 items-start mb-24 md:mb-60">
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <div className="flex items-center gap-8 mb-12">
                                <div className="h-0.5 w-16 bg-white/20" />
                                <span className="text-[10px] font-[900] tracking-[1.2em] text-[#00FF41] block uppercase">COMMUNICATIONS // SECURE_CHANNEL</span>
                            </div>
                            <h1 className="text-5xl md:text-8xl lg:text-[160px] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-12 md:mb-16">
                                ESTABLISH <br /><span className="text-white/10">CONTACT.</span>
                            </h1>
                            <p className="max-w-xl text-white/40 text-xl md:text-3xl font-light leading-relaxed mb-12 md:mb-20 italic">
                                Open a direct line to our intelligence units for mission-critical security inquiries and high-fidelity project coordination.
                            </p>

                            <div className="space-y-20 border-l-2 border-white/5 pl-12">
                                <div className="flex items-start gap-12 group">
                                    <div className="scale-125">
                                        <TechnicalIcon icon={Mail} glowColor="#00FF41" />
                                    </div>
                                    <div>
                                        <h4 className="text-[11px] font-[900] tracking-[0.5em] text-[#00FF41]/40 uppercase mb-4">Direct_Telemetry</h4>
                                        <p className="text-xl md:text-3xl font-[900] text-white group-hover:translate-x-4 transition-transform duration-500 italic uppercase tracking-tighter">help@denti.systems</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-12 group">
                                    <div className="scale-125">
                                        <TechnicalIcon icon={Phone} glowColor="#00FF41" />
                                    </div>
                                    <div>
                                        <h4 className="text-[11px] font-[900] tracking-[0.5em] text-[#00FF41]/40 uppercase mb-4">Live_Command</h4>
                                        <p className="text-xl md:text-3xl font-[900] text-white group-hover:translate-x-4 transition-transform duration-500 italic uppercase tracking-tighter">+8801308539526</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:w-1/2 w-full lg:mt-0 mt-12 relative">
                        {/* Architectural Glow behind form */}
                        <div className="absolute -inset-10 bg-[#00FF41]/5 rounded-full blur-[120px] pointer-events-none opacity-50" />

                        <Card className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 backdrop-blur-3xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
                                <ShieldCheck className="h-40 w-40 text-[#00FF41]" />
                            </div>
                            <CardHeader className="p-0 mb-12 relative z-10">
                                <CardTitle className="text-3xl font-black text-white uppercase tracking-tight italic">Mission_Briefing</CardTitle>
                                <CardDescription className="text-white/20 text-sm tracking-widest uppercase mt-4">Required fields for protocol validation</CardDescription>
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
                                                            <Input placeholder="IDENT_NAME" className="h-16 bg-white/[0.02] border-white/10 rounded-2xl text-white placeholder:text-white/10 px-6 focus:border-[#00FF41]/50 tracking-widest uppercase font-bold text-xs" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input placeholder="TELEMETRY_EMAIL" className="h-16 bg-white/[0.02] border-white/10 rounded-2xl text-white placeholder:text-white/10 px-6 focus:border-[#00FF41]/50 tracking-widest uppercase font-bold text-xs" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
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
                                                        <Input placeholder="ORGANIZATION_ENTITY" className="h-16 bg-white/[0.02] border-white/10 rounded-2xl text-white placeholder:text-white/10 px-6 focus:border-[#00FF41]/50 tracking-widest uppercase font-bold text-xs" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="message"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Textarea placeholder="TRANSMISSION_DATA" className="min-h-[160px] bg-white/[0.02] border-white/10 rounded-[2rem] text-white placeholder:text-white/10 p-6 focus:border-[#00FF41]/50 tracking-wider uppercase font-bold text-xs italic" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Magnetic strength={0.25} className="w-full">
                                            <Button type="submit" size="lg" className="h-16 md:h-20 w-full rounded-full bg-white text-black font-black uppercase tracking-[0.4em] text-[11px] md:text-[13px] hover:bg-[#00FF41] transition-all shadow-2xl" disabled={isSubmitting}>
                                                {isSubmitting ? <Loader2 className="mr-4 h-6 w-6 animate-spin" /> : "TRANSMIT INQUIRY"}
                                            </Button>
                                        </Magnetic>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Tactical Locations Grid */}
                <div className="pt-24 md:pt-40 border-t border-white/5">
                    <div className="max-w-2xl mb-12 md:mb-24">
                        <span className="text-[10px] font-bold tracking-[0.8em] text-[#00FF41] mb-8 block uppercase">GLOBAL_PRESENCE // NODES</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic leading-none">THE NETWORK CENTERS</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 md:gap-16 mt-16 md:mt-[10vh]">
                        {[
                            { city: "SINGAPORE", loc: "101 Kallang Ave", type: "HQ" },
                            { city: "BANGLADESH", loc: "Jahaj Company More", type: "OPS" },
                            { city: "TEK_HUB", loc: "Mohona Tower", type: "LAB" }
                        ].map((loc, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 md:p-16 bg-white/[0.01] border border-white/10 rounded-[3rem] md:rounded-[4rem] group hover:bg-white/[0.02] hover:border-[#00FF41]/20 transition-all duration-700 relative overflow-hidden"
                            >
                                <div className="text-[11px] font-[900] text-[#00FF41] tracking-[0.6em] mb-8 uppercase flex items-center gap-4">
                                    <span className="h-2 w-2 bg-[#00FF41] rounded-full animate-pulse shadow-[0_0_10px_#00FF41]" />
                                    {loc.type}_UNIT
                                </div>
                                <h4 className="text-3xl md:text-4xl font-[900] text-white uppercase italic tracking-tighter mb-6 group-hover:translate-x-4 transition-transform duration-500 leading-none">{loc.city}</h4>
                                <p className="text-white/20 text-lg font-light italic leading-relaxed">{loc.loc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
