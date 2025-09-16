
import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/lib/auth";
import SphereAnimation from "@/components/animations/Sphere";

export const metadata: Metadata = {
  title: "DentiSystems — Elite Cybersecurity & Custom Web Engineering",
  description:
    "High-risk vendor recon, breach monitoring, and secure web development that reduces operational risk.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-transparent font-body antialiased flex flex-col"
        )}
        suppressHydrationWarning={true}
      >
        <SphereAnimation />
        <AuthProvider>
          <Header />
          <main className="flex-grow z-10">{children}</main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
