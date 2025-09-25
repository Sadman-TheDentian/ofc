
import Link from "next/link";

export default function StatusPage() {
  return (
    <div className="container py-12 md:py-20 text-center">
      <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
        Service Status
      </h1>
      <p className="mt-4 text-xl text-muted-foreground">
        All systems are currently operational. This page will be updated with real-time status information soon.
      </p>
      <Link href="/" className="mt-8 inline-block text-primary hover:underline">
        &larr; Back to Home
      </Link>
    </div>
  );
}
