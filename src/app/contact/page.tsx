'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Building, Loader2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { submitInquiry } from "./actions";


const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(1000, { message: "Message must be under 1000 characters."}),
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
            if(result.success) {
                toast({
                    title: "Inquiry Submitted!",
                    description: "Thank you for contacting us. We'll get back to you shortly.",
                });
                form.reset();
            } else {
                 toast({
                    variant: "destructive",
                    title: "Submission Failed",
                    description: result.message || "An unknown error occurred. Please try again.",
                });
            }
        } catch (error) {
             toast({
                variant: "destructive",
                title: "Submission Failed",
                description: "An unexpected error occurred. Please try again later.",
            });
        }
    }


  return (
    <div className="container py-12 md:py-20">
      <div className="text-center space-y-4 mb-12 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
          Get in Touch
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
          Have a question or a project in mind? We'd love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-headline">Send us a Message</CardTitle>
            <CardDescription>
              Fill out the form and we'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
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
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="john@example.com" {...field} />
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
                            <FormLabel>Company (Optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="Your Company Inc." {...field} />
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
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Your message..." className="min-h-[120px]" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit Inquiry
                    </Button>
                </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-8">
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
