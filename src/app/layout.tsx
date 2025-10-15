
import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/lib/auth";
import GalaxyAnimation from "@/components/animations/Galaxy";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import LogoLoader from "@/components/animations/LogoLoader";

const logoUrl =
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirwhyibjl-3Guf8S6G442OtQmAdOzHrTcxPAuK6QxCGcAJ2I88K7Ee9DN-k_SONDddf2FeB4SwHO8l29PZ9HvHHlxJxiPDnfgrY1DBS60HsVaYv0uOAi08fm6KyrwhM7HPQhbQhL5ufVU_efX268tXM4rR8Vwok_UqbSar_b-B4btAigP5BFaU12PCjUE/s320/DENTI.SYSTEMS%20PNJ.png';


export const metadata: Metadata = {
  title: "DentiSystems — Elite Cybersecurity & Custom Web Engineering",
  description:
    "High-risk vendor recon, breach monitoring, and secure web development that reduces operational risk.",
  icons: {
    icon: logoUrl,
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "DentiSystems",
  "url": "https://www.denti.systems",
  "logo": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirwhyibjl-3Guf8S6G442OtQmAdOzHrTcxPAuK6QxCGcAJ2I88K7Ee9DN-k_SONDddf2FeB4SwHO8l29PZ9HvHHlxJxiPDnfgrY1DBS60HsVaYv0uOAi08fm6KyrwhM7HPQhbQhL5ufVU_efX268tXM4rR8Vwok_UqbSar_b-B4btAigP5BFaU12PCjUE/s320/DENTI.SYSTEMS%20PNJ.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-212-845-9947",
    "contactType": "Customer Service",
    "email": "help@denti.systems"
  },
  "sameAs": [
    "https://x.com/dentisystemsofc",
    "https://www.instagram.com/denti.systems/",
    "https://www.linkedin.com/company/dentisystems/",
    "https://www.facebook.com/profile.php?id=61573782310257",
    "https://www.youtube.com/@denti.systems",
    "https://www.crunchbase.com/organization/dentisystems"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script type="text/javascript" src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" async />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <script src="https://www.google.com/recaptcha/enterprise.js?render=6LcHfdkrAAAAACT50f21UCQfGiRAoDzPQeKXhbGp" async defer></script>
        
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-52G6ZBH1ZM"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-52G6ZBH1ZM');
        `}} />

      </head>
      <body
        className={cn(
          "min-h-screen bg-transparent font-body antialiased flex flex-col"
        )}
        suppressHydrationWarning={true}
      >
        <LogoLoader />
        <GalaxyAnimation />
        <FirebaseClientProvider>
          <AuthProvider>
            <Header />
            <main className="flex-grow z-10">{children}</main>
            <Footer />
            <Toaster />
          </AuthProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
