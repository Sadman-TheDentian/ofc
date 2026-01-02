
'use client';

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, Chrome, Loader2, ArrowRight, Lock, ShieldCheck } from "lucide-react";
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
import { verifyRecaptcha } from "./actions";
import { motion } from "framer-motion";
import CyberGrid from "@/components/CyberGrid";

declare const grecaptcha: any;

const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email deployment." }),
  password: z
    .string()
    .min(8, { message: "Security protocol requires 8+ chars." }),
});

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email." }),
  password: z.string().min(1, { message: "Key required." }),
});

const getAuthErrorMessage = (error: FirebaseError | Error) => {
  if ('code' in error) {
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'PROTOCOL_DENIED: Invalid Credentials.';
      default:
        return `SYSTEM_ERROR: ${error.code}`;
    }
  }
  return error.message;
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
      toast({
        variant: "destructive",
        title: "PROTOCOL_DENIED",
        description: getAuthErrorMessage(error as FirebaseError),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (data: z.infer<typeof signUpSchema>) => {
    setLoading(true);
    try {
      const token = await grecaptcha.enterprise.execute('6LcHfdkrAAAAACT50f21UCQfGiRAoDzPQeKXhbGp', { action: 'SIGNUP' });
      const recaptchaResult = await verifyRecaptcha(token);
      if (!recaptchaResult.success || recaptchaResult.score < 0.7) {
        throw new Error("RECAPTCHA_FAILED: Low security score.");
      }
      await signUpWithEmail(data.email, data.password);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "PROTOCOL_FAILURE",
        description: getAuthErrorMessage(error as FirebaseError | Error),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setSocialLoading(provider);
    try {
      if (provider === 'google') await signInWithGoogle();
      if (provider === 'github') await signInWithGithub();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "AUTHENTICATION_FAULT",
        description: getAuthErrorMessage(error as FirebaseError),
      });
    } finally {
      setSocialLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center pt-32 pb-20 relative overflow-hidden">
      <CyberGrid />
      {/* Background Architectures */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-[#00FF41]/5 via-transparent to-transparent opacity-50 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl relative z-10 px-4"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex h-12 w-12 rounded-full bg-[#00FF41]/10 border border-[#00FF41]/20 items-center justify-center mb-8"
          >
            <Lock className="h-5 w-5 text-[#00FF41]" />
          </motion.div>
          <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase mb-4 leading-none">IDENTITY <span className="text-white/20">VAULT</span></h1>
          <p className="text-white/30 text-xs tracking-[0.4em] uppercase font-bold italic font-mono">SECURE_ENTRY_PROTOCOL</p>
        </div>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/[0.03] border border-white/5 rounded-full p-2 mb-12 h-16">
            <TabsTrigger value="signin" className="rounded-full text-[11px] font-bold tracking-widest uppercase data-[state=active]:bg-white data-[state=active]:text-black transition-all">Sign_In</TabsTrigger>
            <TabsTrigger value="signup" className="rounded-full text-[11px] font-bold tracking-widest uppercase data-[state=active]:bg-white data-[state=active]:text-black transition-all">Register_Protocol</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <Card className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 md:p-14 backdrop-blur-3xl shadow-none hover:border-white/10 transition-all duration-700">
              <Form {...signInForm}>
                <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-8">
                  <div className="space-y-6">
                    <FormField
                      control={signInForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="OPERATOR_EMAIL" className="h-16 bg-white/[0.02] border-white/10 rounded-2xl text-white placeholder:text-white/10 px-6 focus:border-[#00FF41]/50 tracking-widest uppercase font-bold text-xs" {...field} />
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
                          <FormControl>
                            <Input type="password" placeholder="SECURITY_KEY" className="h-16 bg-white/[0.02] border-white/10 rounded-2xl text-white placeholder:text-white/10 px-6 focus:border-[#00FF41]/50 tracking-widest uppercase font-bold text-xs" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="h-20 w-full rounded-full bg-white text-black font-black uppercase tracking-[0.4em] text-[13px] hover:bg-[#00FF41] transition-all shadow-2xl" disabled={loading || !!socialLoading}>
                    {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : "AUTHENTICATE"}
                  </Button>
                </form>
              </Form>

              <div className="relative my-12">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/5" />
                </div>
                <div className="relative flex justify-center text-[8px] uppercase tracking-[0.5em] font-bold text-white/10">
                  <span className="bg-black/0 px-4">Federated_Access</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Button variant="outline" className="h-16 rounded-full border-white/10 bg-white/5 text-white/40 hover:text-white hover:border-[#00FF41]/50 transition-all font-bold tracking-widest text-[9px]" onClick={() => handleSocialLogin('github')} disabled={!!socialLoading || loading}>
                  {socialLoading === 'github' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Github className="mr-3 h-4 w-4" />} GITHUB
                </Button>
                <Button variant="outline" className="h-16 rounded-full border-white/10 bg-white/5 text-white/40 hover:text-white hover:border-[#00FF41]/50 transition-all font-bold tracking-widest text-[9px]" onClick={() => handleSocialLogin('google')} disabled={!!socialLoading || loading}>
                  {socialLoading === 'google' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Chrome className="mr-3 h-4 w-4" />} GOOGLE
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 md:p-14 backdrop-blur-3xl shadow-none">
              <Form {...signUpForm}>
                <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-8">
                  <div className="space-y-6">
                    <FormField
                      control={signUpForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="RECON_EMAIL" className="h-16 bg-white/[0.02] border-white/10 rounded-2xl text-white placeholder:text-white/10 px-6 focus:border-[#00FF41]/50 tracking-widest uppercase font-bold text-xs" {...field} />
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
                          <FormControl>
                            <Input type="password" placeholder="MASTER_PASSPHRASE" className="h-16 bg-white/[0.02] border-white/10 rounded-2xl text-white placeholder:text-white/10 px-6 focus:border-[#00FF41]/50 tracking-widest uppercase font-bold text-xs" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="h-20 w-full rounded-full bg-white text-black font-black uppercase tracking-[0.4em] text-[13px] hover:bg-[#00FF41] transition-all shadow-2xl" disabled={loading || !!socialLoading}>
                    {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : "DEPLOY_IDENTITY"}
                  </Button>
                </form>
              </Form>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
