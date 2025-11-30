import HomePageClient from './HomePageClient';
import StructuredData from '@/components/StructuredData';
import { partners } from '@/lib/partners';

export default async function Home() {
  return (
    <>
      <StructuredData />
      <HomePageClient
        partners={partners}
      />
    </>
  );
}
