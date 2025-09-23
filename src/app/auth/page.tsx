
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, Chrome, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FirebaseError } from "firebase/app";

const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

const getAuthErrorMessage = (error: FirebaseError) => {
    switch (error.code) {
        case 'auth/invalid-email':
            return 'Invalid email address format.';
        case 'auth/user-disabled':
            return 'This user account has been disabled.';
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
            return 'Invalid email or password. Please check your credentials and try again.';
        case 'auth/email-already-in-use':
            return 'An account with this email address already exists. Please sign in instead.';
        case 'auth/weak-password':
            return 'The password is too weak. It must be at least 6 characters long.';
        case 'auth/operation-not-allowed':
            return 'This sign-in method is not enabled. Please contact support.';
        case 'auth/popup-closed-by-user':
            return 'The authentication popup was closed before completing the sign-in. Please try again.';
        case 'auth/cancelled-popup-request':
            return 'Multiple login attempts detected. Please complete one before trying another.';
        case 'auth/popup-blocked':
            return 'Authentication popup was blocked by the browser. Please allow popups for this site.';
        case 'auth/invalid-api-key':
             return 'Authentication failed: Invalid API Key. Please contact support.';
        case 'auth/network-request-failed':
            return 'A network error occurred. Please check your internet connection and try again.';
        default:
            console.error('Unhandled Firebase Auth Error:', error);
            return 'An unexpected authentication error occurred. Please try again later.';
    }
}

export default function AuthPage() {
  const {
    signInWithGoogle,
    signInWithGithub,
    signUpWithEmail,
    signInWithEmail,
  } = useAuth();
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(null);
  const { toast } = useToast();

  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleSignIn = async (data: z.infer<typeof signInSchema>) => {
    setLoading(true);
    try {
      await signInWithEmail(data.email, data.password);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      toast({
        variant: "destructive",
        title: "Sign In Failed",
        description: getAuthErrorMessage(firebaseError),
      });
    } finally {
        setLoading(false);
    }
  };

  const handleSignUp = async (data: z.infer<typeof signUpSchema>) => {
    setLoading(true);
    try {
      await signUpWithEmail(data.email, data.password);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: getAuthErrorMessage(firebaseError),
      });
    } finally {
        setLoading(false);
    }
  };
  
  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setSocialLoading(provider);
    try {
        if(provider === 'google') await signInWithGoogle();
        if(provider === 'github') await signInWithGithub();
    } catch (error) {
       console.error(`Social login error (${provider}):`, error);
       const firebaseError = error as FirebaseError;
        toast({
            variant: "destructive",
            title: "Authentication Failed",
            description: getAuthErrorMessage(firebaseError),
        });
    } finally {
        setSocialLoading(null);
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <Tabs defaultValue="signin" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <Card className="bg-gradient-to-br from-card to-card/80 border-border/50">
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-2xl">
                Access Your Dashboard
              </CardTitle>
              <CardDescription>
                Enter your credentials to manage your security tools.
              </CardDescription>
            </CardHeader>
            <Form {...signInForm}>
              <form onSubmit={signInForm.handleSubmit(handleSignIn)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={signInForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="user@denti.systems"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signInForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button type="submit" className="w-full" disabled={loading || !!socialLoading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                  </Button>
                </CardFooter>
              </form>
            </Form>
            <CardFooter className="flex flex-col gap-4">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="w-full grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={() => handleSocialLogin('github')} disabled={!!socialLoading || loading}>
                  {socialLoading === 'github' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Github className="mr-2 h-4 w-4" />}
                  GitHub
                </Button>
                <Button variant="outline" onClick={() => handleSocialLogin('google')} disabled={!!socialLoading || loading}>
                   {socialLoading === 'google' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Chrome className="mr-2 h-4 w-4" />}
                  Google
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card className="bg-gradient-to-br from-card to-card/80 border-border/50">
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-2xl">
                Create an Account
              </CardTitle>
              <CardDescription>
                Join DentiSystems to access our suite of security tools.
              </CardDescription>
            </CardHeader>
            <Form {...signUpForm}>
              <form onSubmit={signUpForm.handleSubmit(handleSignUp)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={signUpForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="user@denti.systems"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signUpForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button type="submit" className="w-full" disabled={loading || !!socialLoading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign Up
                  </Button>
                </CardFooter>
              </form>
            </Form>
             <CardFooter className="flex flex-col gap-4">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or sign up with
                  </span>
                </div>
              </div>
              <div className="w-full grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={() => handleSocialLogin('github')} disabled={!!socialLoading || loading}>
                  {socialLoading === 'github' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Github className="mr-2 h-4 w-4" />}
                  GitHub
                </Button>
                <Button variant="outline" onClick={() => handleSocialLogin('google')} disabled={!!socialLoading || loading}>
                   {socialLoading === 'google' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Chrome className="mr-2 h-4 w-4" />}
                  Google
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
