
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useDoc } from "@/firebase";
import { doc } from "firebase/firestore";
import { useFirebase } from "@/firebase/provider";
import { useState } from "react";
import { createCoinbaseCharge } from "./actions";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function SubscriptionsPage() {
    const { user, loading: authLoading } = useAuth();
    const { firestore } = useFirebase();
    const { toast } = useToast();

    // Memoize the document reference to prevent re-renders
    const userDocRef = firestore && user ? doc(firestore, 'users', user.uid) : null;
    const { data: userData, isLoading: userLoading } = useDoc(userDocRef);

    const [isRedirecting, setIsRedirecting] = useState(false);

    const proFeatures = [
        "Unlimited access to all tools including DarkCheck, PhishRisk, and PasswordLeaker PRO.",
        "Full API access for integrations and automated workflows.",
        "Real-time threat alerts and priority support.",
    ];
    
    const handleUpgrade = async () => {
        if (!user || !user.email) {
            toast({ variant: 'destructive', title: 'Authentication Error', description: 'You must be logged in to upgrade.' });
            return;
        }
        setIsRedirecting(true);
        try {
            const result = await createCoinbaseCharge({ 
                userId: user.uid, 
                email: user.email,
                clientOrigin: window.location.origin,
            });
            if (result.success) {
                window.location.href = result.hosted_url;
            } else {
                throw new Error(result.error || 'Failed to create payment session.');
            }
        } catch (error) {
            console.error('Payment initiation error:', error);
            toast({
                variant: 'destructive',
                title: 'Payment Failed',
                description: error instanceof Error ? error.message : 'Could not initiate payment. Please try again.',
            });
            setIsRedirecting(false);
        }
    };

    if (authLoading || userLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }
    
    // @ts-ignore
    const userPlan = userData?.plan || 'free';
    const isPro = userPlan === 'pro';

    return (
        <div>
            <div className="mb-8">
                <h1 className="font-headline text-2xl font-bold">Manage Subscription</h1>
                <p className="text-muted-foreground mt-1">
                    {isPro ? "You are currently on the PRO plan. Thank you for your support." : "Upgrade to unlock all features and full API access."}
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {isPro ? (
                    <Card className="border-primary border-2 shadow-lg shadow-primary/10 bg-gradient-to-br from-card to-card/90">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">PRO Plan</CardTitle>
                            <CardDescription>Your current plan includes:</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {proFeatures.map((feature, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <p>{feature}</p>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="flex flex-col items-start">
                            <p className="text-sm font-bold">Payment successfully processed.</p>
                            <p className="text-sm text-muted-foreground">Thank you for your purchase.</p>
                        </CardFooter>
                    </Card>
                ) : (
                    <Card className="border-primary/50 border-2 shadow-lg shadow-primary/10 flex flex-col bg-gradient-to-br from-card to-card/90">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">Upgrade to PRO</CardTitle>
                            <CardDescription>Unlock unlimited access and powerful features.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3 flex-grow">
                             <p className="text-4xl font-bold text-primary">$0.99<span className="text-lg font-medium text-muted-foreground">/ one-time</span></p>
                            {proFeatures.map((feature, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <p className="text-sm">{feature}</p>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={handleUpgrade} disabled={isRedirecting}>
                                {isRedirecting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isRedirecting ? 'Redirecting to Payment...' : 'Upgrade with Crypto'}
                            </Button>
                        </CardFooter>
                    </Card>
                )}

                 <Card className="bg-gradient-to-br from-card to-card/80 border-border/50">
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">Billing & Support</CardTitle>
                        <CardDescription>Manage payments or get help.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <p className="font-semibold">{isPro ? "Payment via Coinbase Commerce" : "No payment method on file"}</p>
                        <p className="text-sm text-muted-foreground">{isPro ? "Lifetime PRO access" : "Upgrade to add a payment method."}</p>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                        <Button variant="outline" disabled={!isPro}>View Invoices</Button>
                        <Button variant="secondary" asChild><Link href="/contact">Contact Support</Link></Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
