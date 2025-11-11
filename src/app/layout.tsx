
import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/lib/auth";
import GalaxyAnimation from "@/components/animations/Galaxy";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import LoadingScreen from "@/components/animations/LoadingScreen";
import StructuredData from "@/components/StructuredData";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <StructuredData />
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
        
        {/* Subscribe with Google */}
        <script async type="application/javascript"
        src="https://news.google.com/swg/js/v1/swg-basic.js"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          (self.SWG_BASIC = self.SWG_BASIC || []).push( basicSubscriptions => {
            basicSubscriptions.init({
              type: "NewsArticle",
              isPartOfType: ["Product"],
              isPartOfProductId: "CAow-KTCDA:openaccess",
              clientOptions: { theme: "light", lang: "en" },
            });
          });
        `}} />

      </head>
      <body
        className={cn(
          "min-h-screen bg-transparent font-body antialiased flex flex-col"
        )}
        suppressHydrationWarning={true}
      >
        <LoadingScreen />
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
