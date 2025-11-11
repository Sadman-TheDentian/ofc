
'use client';

import React from 'react';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DentiSystems',
  url: 'https://www.denti.systems',
  logo: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirwhyibjl-3Guf8S6G442OtQmAdOzHrTcxPAuK6QxCGcAJ2I88K7Ee9DN-k_SONDddf2FeB4SwHO8l29PZ9HvHHlxJxiPDnfgrY1DBS60HsVaYv0uOAi08fm6KyrwhM7HPQhbQhL5ufVU_efX268tXM4rR8Vwok_UqbSar_b-B4btAigP5BFaU12PCjUE/s320/DENTI.SYSTEMS%20PNJ.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-212-845-9947',
    contactType: 'Customer Service',
    email: 'help@denti.systems',
  },
  sameAs: [
    'https://x.com/dentisystemsofc',
    'https://www.instagram.com/denti.systems/',
    'https://www.linkedin.com/company/dentisystems/',
    'https://www.facebook.com/profile.php?id=61573782310257',
    'https://www.youtube.com/@denti.systems',
    'https://www.crunchbase.com/organization/dentisystems',
  ],
};

interface StructuredDataProps {
  data?: Record<string, any>;
}

const StructuredData = ({ data }: StructuredDataProps) => {
  const finalSchema = data ? {
    ...organizationSchema,
    ...data,
    '@type': Array.isArray(data['@type']) 
      ? ['Organization', ...data['@type']]
      : ['Organization', data['@type']]
  } : organizationSchema;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(finalSchema) }}
    />
  );
};

export default StructuredData;
