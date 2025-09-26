import Image from 'next/image';
import Link from 'next/link';

export default function ServerError() {
  return (
    <main className="bg-background relative isolate min-h-svh py-12">
      <Image
        src="/images/error.png"
        alt="Error illustration"
        className="absolute inset-0 -z-10 size-full object-cover object-top"
        fill
      />

      <div className="bg-background/10 mx-auto max-w-7xl rounded-2xl px-6 py-32 text-center backdrop-blur-sm sm:py-40 lg:px-8">
        <p className="text-primary text-base/8 font-semibold">Error</p>
        <h1 className="text-foreground mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
          Something went wrong
        </h1>

        <p className="text-foreground/80 mt-6 text-lg font-medium text-pretty sm:text-xl/8">
          Sorry, we encountered an unexpected error. Please try again.
        </p>

        <div className="mt-10 flex justify-center">
          <Link
            href="/"
            className="text-foreground hover:text-muted-foreground text-sm/7 font-semibold"
          >
            <span aria-hidden="true">&larr;</span> Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
