
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Loader2, ArrowRight, ShieldCheck, Zap, Star, Activity, CreditCard } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useDoc } from "@/firebase";
import { doc } from "firebase/firestore";
import { useFirebase } from "@/firebase/provider";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SubscriptionsPage() {
    const { user, loading: authLoading } = useAuth();
    const { firestore } = useFirebase();
    const { toast } = useToast();
    const router = useRouter();

    const userDocRef = firestore && user ? doc(firestore, 'users', user.uid) : null;
    const { data: userData, isLoading: userLoading } = useDoc(userDocRef);

    const [isRedirecting, setIsRedirecting] = useState(false);

    const proFeatures = [
        "UNLIMITED_ACCESS // ALL_MODULES",
        "FULL_API_PROTOCOL // gRPC_ENABLED",
        "REALTIME_THREAT_TELEMETRY // L3",
        "PRIORITY_COMMAND_SUPPORT // 24/7",
        "CUSTOM_NEURAL_SITES // BESPOKE"
    ];

    const handleUpgrade = async () => {
        if (!user || !user.email) {
            toast({ variant: 'destructive', title: 'AUTH_FAILURE', description: 'Session mismatch. Please reconnect node.' });
            return;
        }
        setIsRedirecting(true);
        router.push('/pricing');
    };

    if (authLoading || userLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-12 w-12 animate-spin text-[#00FF41]" />
            </div>
        );
    }

    const userPlan = (userData as { plan: string } | null)?.plan || 'free';
    const isPro = userPlan === 'pro';

    return (
        <div className="space-y-20">
            {/* Header */}
            <div className="max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="flex items-center gap-6 mb-8">
                        <div className="h-2 w-2 bg-[#00FF41] rounded-full animate-pulse shadow-[0_0_10px_#00FF41]" />
                        <span className="text-[10px] font-bold tracking-[0.8em] text-[#00FF41] uppercase">FISCAL_PROTOCOL // RESOURCE_ALLOCATION</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-[900] tracking-tighter text-white uppercase italic leading-none mb-12">
                        SUBSCRIPTION <span className="text-white/20">NODE</span>
                    </h1>
                </motion.div>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 items-start">
                {/* Current Plan Card */}
                <div className="lg:col-span-12">
                    <div className="bg-white/[0.01] border border-white/5 rounded-[3.5rem] p-12 md:p-16 backdrop-blur-3xl relative overflow-hidden group">
                        {/* Ambient Glow */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00FF41]/5 blur-[100px] pointer-events-none rounded-full" />

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 relative z-10">
                            <div>
                                <div className="text-[10px] font-black tracking-[0.6em] text-white/20 uppercase mb-4">ACTIVE_IDENT_PLAN</div>
                                <h2 className="text-5xl md:text-6xl font-black text-white italic tracking-tighter uppercase mb-6">
                                    {isPro ? 'ELITE_PROTOCOL' : 'ALPHA_ACCESS'}
                                </h2>
                                <div className="flex items-center gap-4 py-2 px-6 rounded-full bg-white/5 border border-white/10 w-fit">
                                    <div className={`h-2 w-2 rounded-full ${isPro ? 'bg-[#00FF41] shadow-[0_0_10px_#00FF41]' : 'bg-white/20'}`} />
                                    <span className="text-[9px] font-black text-white/40 tracking-widest uppercase italic">STATUS: {isPro ? 'VERIFIED_ELITE' : 'RESTRICTED_ACCESS'}</span>
                                </div>
                            </div>

                            {!isPro && (
                                <Button
                                    onClick={handleUpgrade}
                                    disabled={isRedirecting}
                                    className="h-16 px-12 rounded-full bg-white text-black font-black uppercase tracking-[0.3em] text-[11px] hover:bg-[#00FF41] transition-all shadow-2xl group"
                                >
                                    {isRedirecting ? <Loader2 className="h-5 w-5 animate-spin" /> : "UPGRADE_PROTOCOL"}
                                    {!isRedirecting && <ArrowRight className="ml-4 h-5 w-5 transform group-hover:translate-x-2 transition-transform" />}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Features & Breakdown */}
                <div className="lg:col-span-7">
                    <div className="bg-white/[0.01] border border-white/5 rounded-[3.5rem] p-12 md:p-16 backdrop-blur-3xl h-full">
                        <h3 className="text-[10px] font-black tracking-[0.4em] text-white uppercase mb-12 flex items-center gap-6">
                            PROTOCOL_CAPABILITIES
                            <div className="h-px flex-grow bg-white/5" />
                        </h3>
                        <div className="space-y-10">
                            {proFeatures.map((feature, index) => (
                                <div key={index} className="flex items-start gap-8 group">
                                    <div className={`h-10 w-10 flex-shrink-0 rounded-2xl border border-white/5 flex items-center justify-center transition-all ${isPro ? 'text-[#00FF41] bg-[#00FF41]/5 border-[#00FF41]/20' : 'text-white/10 bg-white/5'}`}>
                                        <ShieldCheck className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className={`text-lg font-black italic tracking-tight uppercase mb-2 ${isPro ? 'text-white' : 'text-white/20'}`}>{feature.split(' // ')[0]}</h4>
                                        <p className="text-[9px] font-bold text-white/10 tracking-[0.3em] uppercase">{feature.split(' // ')[1]}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Billing HUD */}
                <div className="lg:col-span-5 h-full">
                    <div className="bg-white/[0.01] border border-white/5 rounded-[3.5rem] p-12 md:p-16 backdrop-blur-3xl h-full flex flex-col relative overflow-hidden">
                        {/* Glass Overlay Pattern */}
                        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

                        <div className="h-16 w-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30 mb-8">
                            <CreditCard className="h-8 w-8" />
                        </div>
                        <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2">BILLING_CORE</h3>
                        <p className="text-[9px] font-bold text-white/20 tracking-widest uppercase mb-12 italic">Managed fiscal telemetry</p>

                        <div className="space-y-6 flex-grow">
                            <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5">
                                <div className="text-[8px] font-bold text-white/10 tracking-widest uppercase mb-4">PAYMENT_PROVIDER</div>
                                <div className="text-xl font-black text-white italic">{isPro ? "COINBASE_COMMERCE" : "WAITING_FOR_SYNC"}</div>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5">
                                <div className="text-[8px] font-bold text-white/10 tracking-widest uppercase mb-4">BILLING_CYCLE</div>
                                <div className="text-xl font-black text-white italic">{isPro ? "LIFETIME_SUBSCRIBER" : "MONTHLY_RECURRING"}</div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-white/5 flex gap-4">
                            <Button variant="outline" className="flex-1 h-12 rounded-full border-white/10 text-white/20 text-[9px] font-black tracking-widest uppercase hover:bg-white/5 hover:text-white" disabled={!isPro}>
                                INVOICES
                            </Button>
                            <Link href="/contact" className="flex-1">
                                <Button className="w-full h-12 rounded-full bg-white/5 text-white/40 text-[9px] font-black tracking-widest uppercase hover:bg-white hover:text-black transition-all">
                                    SUPPORT
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* HUD Footline */}
            <div className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-20">
                <div className="text-[8px] font-bold tracking-[0.5em] text-white uppercase font-mono">FISCAL_NODE_STATE: SYNCHRONIZED</div>
                <div className="flex gap-12 text-[8px] font-bold tracking-[0.5em] text-white uppercase italic">
                    " PRECISION REQUIRES TRANSPARENT ECONOMICS. "
                </div>
            </div>
        </div>
    )
}
