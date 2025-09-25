
import Link from "next/link";

export default function ThreatReportsPage() {
  return (
    <div className="container py-12 md:py-20 text-center">
      <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
        Threat Reports
      </h1>
      <p className="mt-4 text-xl text-muted-foreground">
        In-depth analysis of the latest cybersecurity threats. This section is coming soon.
      </p>
      <Link href="/" className="mt-8 inline-block text-primary hover:underline">
        &larr; Back to Home
      </Link>
    </div>
  );
}
