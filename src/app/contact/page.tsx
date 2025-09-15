
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Building } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center space-y-4 mb-12">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl animate-fade-in-up">
          Get in Touch
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Have a question or a project in mind? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <Card className="bg-card border-border/50 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle className="font-headline">Send us a Message</CardTitle>
            <CardDescription>
              Fill out the form and we&apos;ll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
            </div>
             <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" placeholder="Your Company Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Your message..." className="min-h-[120px]" />
            </div>
            <Button size="lg" className="w-full">Submit Inquiry</Button>
          </CardContent>
        </Card>

        <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div>
                <h3 className="font-headline text-xl font-semibold border-l-4 border-primary pl-4 mb-4">
                    Contact Information
                </h3>
                <p className="text-muted-foreground mb-6">
                    Reach out to us directly through the channels below.
                </p>
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-secondary rounded-md mt-1">
                            <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h4 className="font-semibold">Email</h4>
                            <p className="text-muted-foreground">General Inquiries</p>
                            <a href="mailto:support@dentisystems.com" className="text-primary hover:underline">
                                support@dentisystems.com
                            </a>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="p-2 bg-secondary rounded-md mt-1">
                            <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h4 className="font-semibold">Phone</h4>
                            <p className="text-muted-foreground">Mon-Fri, 9am-5pm EST</p>
                            <p>+1 (555) 123-4567</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="p-2 bg-secondary rounded-md mt-1">
                            <Building className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h4 className="font-semibold">Headquarters</h4>
                            <p className="text-muted-foreground">123 Cyber Street, Suite 101</p>
                            <p>Metropolis, USA 90210</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
