
'use client';

import React from 'react';

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "DentiSystems",
  "url": "https://www.denti.systems",
  "logo": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirwhyibjl-3Guf8S6G442OtQmAdOzHrTcxPAuK6QxCGcAJ2I88K7Ee9DN-k_SONDddf2FeB4SwHO8l29PZ9HvHHlxJxiPDnfgrY1DBS60HsVaYv0uOAi08fm6KyrwhM7HPQhbQhL5ufVU_efX268tXM4rR8Vwok_UqbSar_b-B4btAigP5BFaU12PCjUE/s320/DENTI.SYSTEMS%20PNJ.png",
  "description": "Elite offensive security firm specializing in digital sovereignty, predictive intelligence, and industrial-grade vulnerability research.",
  "foundingDate": "2024",
  "identifier": "Q137452941",
  "sameAs": [
    "https://www.wikidata.org/wiki/Q137452941",
    "https://www.crunchbase.com/organization/dentisystems",
    "https://clutch.co/profile/dentisystems",
    "https://www.linkedin.com/company/dentisystems",
    "https://x.com/dentisystemsofc"
  ],
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "101 Kallang Ave",
      "addressLocality": "Singapore",
      "addressCountry": "SG"
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "Jahaj Company More",
      "addressLocality": "Rangpur",
      "addressCountry": "BD"
    }
  ],
  "founder": {
    "@type": "Person",
    "name": "MD Sadman Shovik",
    "jobTitle": "CEO",
    "sameAs": "https://www.wikidata.org/wiki/User:MD_SADMAN_SHOVIK_SWACHCHHA"
  },
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "SoftwareApplication",
        "name": "DentiGrid",
        "applicationCategory": "SecurityApplication",
        "description": "Enterprise security grid and infrastructure protection system."
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "SoftwareApplication",
        "name": "DarkCheck",
        "applicationCategory": "SecurityApplication",
        "description": "Dark web monitoring and credential leak detection tool."
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "SoftwareApplication",
        "name": "LeakScan",
        "applicationCategory": "SecurityApplication",
        "description": "Automated data breach scanner for businesses."
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "SoftwareApplication",
        "name": "PhishRisk",
        "applicationCategory": "SecurityApplication",
        "description": "Domain risk assessment and phishing intelligence tool."
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "SoftwareApplication",
        "name": "PasswordLeaker",
        "applicationCategory": "SecurityApplication",
        "description": "Security testing tool for identifying compromised credentials."
      }
    }
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "contact@denti.systems"
  }
};

interface StructuredDataProps {
  data?: Record<string, any>;
}

const StructuredData = ({ data }: StructuredDataProps) => {
  const schema = data ? data : organizationSchema;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default StructuredData;
