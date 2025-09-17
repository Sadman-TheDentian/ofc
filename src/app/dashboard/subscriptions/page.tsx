
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function SubscriptionsPage() {
    const proFeatures = [
        "Unlimited access to all tools including DarkCheck, PhishRisk, and PasswordLeaker PRO.",
        "Full API access for integrations and automated workflows.",
        "Real-time threat alerts and priority support.",
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="font-headline text-2xl font-bold">Manage Subscription</h1>
                <p className="text-muted-foreground mt-1">You are currently on the PRO plan. Thank you for your support.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-primary border-2 shadow-lg shadow-primary/10">
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
                        <p className="text-sm font-bold">Billed annually.</p>
                        <p className="text-sm text-muted-foreground">Next renewal: December 21, {new Date().getFullYear()}</p>
                    </CardFooter>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">Billing Information</CardTitle>
                        <CardDescription>Manage your payment method and view invoices.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="font-semibold">Visa ending in 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/26</p>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                        <Button variant="outline">Update Payment</Button>
                        <Button variant="ghost">View Invoices</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
