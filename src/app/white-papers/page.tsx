
import Link from "next/link";

export default function WhitePapersPage() {
  return (
    <div className="container py-12 md:py-20 text-center">
      <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
        White Papers
      </h1>
      <p className="mt-4 text-xl text-muted-foreground">
        Download our detailed reports on security architecture and best practices. This section is coming soon.
      </p>
      <Link href="/" className="mt-8 inline-block text-primary hover:underline">
        &larr; Back to Home
      </Link>
    </div>
  );
}
