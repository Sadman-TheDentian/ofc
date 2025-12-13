
import { services } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ServiceDetailClient from './ServiceDetailClient';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) {
        return {
            title: "Service Not Found"
        }
    }
    return {
        title: `${service.title} | DentiSystems`,
        description: service.description,
    }
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}

export async function generateStaticParams() {
  // Filter out any service that now has a dedicated page under /tools
  const filteredServices = services.filter(service => service.slug !== 'vulnerability-assessment');
  
  return filteredServices.map((service) => ({
    slug: service.slug,
  }));
}

    