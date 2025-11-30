
import HomePageClient from './HomePageClient';
import StructuredData from '@/components/StructuredData';

export default async function Home() {
  return (
    <>
      <StructuredData />
      <HomePageClient />
    </>
  );
}
