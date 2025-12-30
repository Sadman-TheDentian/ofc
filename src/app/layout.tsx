
import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/lib/auth";
import { FirebaseClientProvider } from "@/firebase/client-provider";

const logoUrl =
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirwhyibjl-3Guf8S6G442OtQmAdOzHrTcxPAuK6QxCGcAJ2I88K7Ee9DN-k_SONDddf2FeB4SwHO8l29PZ9HvHHlxJxiPDnfgrY1DBS60HsVaYv0uOAi08fm6KyrwhM7HPQhbQhL5ufVU_efX268tXM4rR8Vwok_UqbSar_b-B4btAigP5BFaU12PCjUE/s320/DENTI.SYSTEMS%20PNJ.png';


export const metadata: Metadata = {
  title: "DentiSystems | Sovereign Offensive Security & Predictive Intel",
  description:
    "Elite offensive security research, high-risk vendor reconnaissance, and breach monitoring. Reducing global operational risk through secure web engineering and telemetric intelligence mining.",
  keywords: ["cybersecurity", "offensive security", "vendor recon", "breach monitoring", "secure web development", "zero trust architecture"],
  authors: [{ name: "DentiSystems Engineering" }],
  openGraph: {
    title: "DentiSystems | Sovereign Offensive Security",
    description: "Elite tactical intelligence and defensive engineering.",
    url: "https://denti.systems",
    siteName: "DentiSystems",
    images: [
      {
        url: logoUrl,
        width: 1200,
        height: 630,
        alt: "DentiSystems Sovereign Link",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: logoUrl,
  }
};

import GrainOverlay from "@/components/layout/GrainOverlay";
import PageWrapper from "@/components/layout/PageWrapper";
import Preloader from "@/components/layout/Preloader";
import StructuredData from "@/components/StructuredData";

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
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=Outfit:wght@300;400;700;900&display=swap"
          rel="stylesheet"
        />
        <script src="https://www.google.com/recaptcha/enterprise.js?render=6LcHfdkrAAAAACT50f21UCQfGiRAoDzPQeKXhbGp" async defer></script>

        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-52G6ZBH1ZM"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-52G6ZBH1ZM');
        `}} />

        {/* Subscribe with Google */}
        <script async type="application/javascript"
          src="https://news.google.com/swg/js/v1/swg-basic.js"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
          (self.SWG_BASIC = self.SWG_BASIC || []).push( basicSubscriptions => {
            basicSubscriptions.init({
              type: "NewsArticle",
              isPartOfType: ["Product"],
              isPartOfProductId: "CAow-KTCDA:openaccess",
              clientOptions: { theme: "light", lang: "en" },
            });
          });
        `}} />

        <StructuredData />
      </head>
      <body
        className={cn(
          "min-h-screen bg-black font-body antialiased flex flex-col selection:bg-[#00FF41]/20"
        )}
        suppressHydrationWarning={true}
      >
        <FirebaseClientProvider>
          <AuthProvider>
            <GrainOverlay />
            <Header />
            <main className="flex-grow z-10">
              <PageWrapper>
                {children}
              </PageWrapper>
            </main>
            <Footer />
            <Toaster />
          </AuthProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
