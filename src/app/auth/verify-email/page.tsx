
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MailCheck, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function VerifyEmailPage() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // If the user lands here but is already verified, send them to the dashboard.
        if (user?.emailVerified) {
            router.push('/dashboard');
        }
    }, [user, router]);

    return (
        <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
            <Card className="w-full max-w-md text-center bg-gradient-to-br from-card to-card/80 border-border/50">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                        <MailCheck className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-2xl mt-4">
                        Please Verify Your Email
                    </CardTitle>
                    <CardDescription>
                        We've sent a verification link to <span className="font-bold text-primary">{user?.email || 'your email'}</span>.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Click the link in the email to activate your account. If you don't see it, please check your spam folder.
                    </p>
                </CardContent>
                <CardContent>
                     <Button asChild>
                        <Link href="/dashboard">Continue to Dashboard</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
