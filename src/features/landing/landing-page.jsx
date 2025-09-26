import { GalleryVerticalEnd, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/base-sheet';

const navigation = [
  { name: 'Features', href: '#' },
  { name: 'Courses', href: '#' },
  { name: 'AI Mentor', href: '#' },
  { name: 'About', href: '#' },
];

export function LandingPage() {
  return (
    <div className="bg-background">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        >
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link
              href="/"
              className="-m-1.5 flex items-center gap-2 p-1.5 font-medium"
            >
              <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-5" />
              </div>
              <span className="text-foreground text-lg font-semibold">
                Sparkly
              </span>
            </Link>
          </div>

          {/* Mobile menu */}
          <div className="flex lg:hidden">
            <Sheet>
              <SheetTrigger className="text-muted-foreground -m-2.5 inline-flex items-center justify-center rounded-md p-2.5">
                <span className="sr-only">Open main menu</span>
                <Menu aria-hidden="true" className="size-6" />
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-sm">
                <div className="mb-6 flex items-center justify-between">
                  <Link
                    href="/"
                    className="-m-1.5 flex items-center gap-2 p-1.5 font-medium"
                  >
                    <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
                      <GalleryVerticalEnd className="size-5" />
                    </div>
                    <span className="text-foreground text-lg font-semibold">
                      Sparkly
                    </span>
                  </Link>
                  <SheetClose className="text-muted-foreground -m-2.5 rounded-md p-2.5">
                    <span className="sr-only">Close menu</span>
                    <X aria-hidden="true" className="size-6" />
                  </SheetClose>
                </div>
                <SheetBody>
                  <div className="divide-border -my-6 divide-y">
                    <div className="space-y-2 py-6">
                      {navigation.map(item => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="text-foreground hover:bg-muted -mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    <div className="py-6">
                      <Link
                        href="/login"
                        className="text-foreground hover:bg-muted -mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold"
                      >
                        Log in
                      </Link>
                    </div>
                  </div>
                </SheetBody>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground text-sm/6 font-semibold"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/login"
              className="text-foreground text-sm/6 font-semibold"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero section */}
        <div className="relative isolate">
          <svg
            aria-hidden="true"
            className="stroke-border absolute inset-x-0 top-0 -z-10 h-256 w-full mask-[radial-gradient(32rem_32rem_at_center,white,transparent)]"
          >
            <defs>
              <pattern
                x="50%"
                y={-1}
                id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                width={200}
                height={200}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="fill-muted overflow-visible">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
              width="100%"
              height="100%"
              strokeWidth={0}
            />
          </svg>
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 left-1/2 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
          >
            <div
              style={{
                clipPath:
                  'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
              }}
              className="from-primary/50 to-primary aspect-801/1036 w-200.25 bg-gradient-to-tr opacity-30"
            />
          </div>

          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pt-36 pb-32 sm:pt-60 lg:px-8 lg:pt-32">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
                  <h1 className="text-foreground text-5xl font-semibold tracking-tight text-pretty sm:text-7xl">
                    Ignite Learning, Inspire Creation
                  </h1>
                  <p className="text-muted-foreground mt-8 text-lg font-medium text-pretty sm:max-w-md sm:text-xl/8 lg:max-w-none">
                    Experience the future of learning with AI-powered
                    mentorship. Dive into courses with personalized assistance
                    that adapts to your pace, answers your questions, and helps
                    you master new skills faster than ever.
                  </p>
                  <div className="mt-10 flex items-center gap-x-6">
                    <Link
                      href="/register"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-primary rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      Start Learning Free
                    </Link>
                    <Link
                      href="#"
                      className="text-foreground text-sm/6 font-semibold"
                    >
                      See how it works <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>

                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                  <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-0 xl:pt-80">
                    <div className="relative">
                      <Image
                        alt="Sparkly app interface"
                        src="/images/sparkly.png"
                        width={176}
                        height={264}
                        className="bg-muted aspect-2/3 w-full rounded-xl object-cover shadow-lg"
                      />
                      <div className="ring-border pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset" />
                    </div>
                  </div>
                  <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative">
                      <Image
                        alt="Book cover"
                        src="/images/book.png"
                        width={176}
                        height={264}
                        className="bg-muted aspect-2/3 w-full rounded-xl object-cover shadow-lg"
                      />
                      <div className="bg-primary/50 pointer-events-none absolute inset-0 rounded-xl mix-blend-multiply" />
                      <div className="ring-border pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset" />
                    </div>
                    <div className="relative">
                      <Image
                        alt="Eric profile"
                        src="/images/eric.jpeg"
                        width={176}
                        height={264}
                        className="bg-muted aspect-2/3 w-full rounded-xl object-cover shadow-lg"
                      />
                      <div className="bg-primary/50 pointer-events-none absolute inset-0 rounded-xl mix-blend-multiply" />
                      <div className="ring-border pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset" />
                    </div>
                  </div>
                  <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    <div className="relative">
                      <Image
                        alt="Jan profile"
                        src="/images/jan-cropped.webp"
                        width={176}
                        height={264}
                        className="bg-muted aspect-2/3 w-full rounded-xl object-cover shadow-lg"
                      />
                      <div className="bg-primary/50 pointer-events-none absolute inset-0 rounded-xl mix-blend-multiply" />
                      <div className="ring-border pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset" />
                    </div>
                    <div className="relative">
                      <Image
                        alt="Sparkly app interface 2"
                        src="/images/sparkly-2.png"
                        width={176}
                        height={264}
                        className="bg-muted aspect-2/3 w-full rounded-xl object-cover shadow-lg"
                      />
                      <div className="ring-border pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
