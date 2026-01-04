import Link from "next/link";
import { BookOpen, Zap, Route, HardDrive, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen p-8 md:p-12 lg:p-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Next.js Feature Test
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            A comprehensive testing and learning playground for Next.js features and capabilities.
            Explore various Next.js patterns, caching strategies, and rendering techniques.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          {/* Blog */}
          <Link
            href="/blog"
            className="group p-6 border rounded-lg hover:border-primary transition-colors hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  Blog
                </h2>
                <p className="text-muted-foreground text-sm">
                  Explore blog functionality and content rendering patterns in Next.js.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

          {/* Server Actions */}
          <Link
            href="/server-action"
            className="group p-6 border rounded-lg hover:border-primary transition-colors hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  Server Actions
                </h2>
                <p className="text-muted-foreground text-sm">
                  Test server-side mutations and form handling with Next.js Server Actions.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

          {/* Route Handlers */}
          <Link
            href="/route-handler"
            className="group p-6 border rounded-lg hover:border-primary transition-colors hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Route className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  Route Handlers
                </h2>
                <p className="text-muted-foreground text-sm">
                  Experiment with API routes and custom request/response handling.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

          {/* Caching */}
          <Link
            href="/caching/fetch"
            className="group p-6 border rounded-lg hover:border-primary transition-colors hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <HardDrive className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  Caching Strategies
                </h2>
                <p className="text-muted-foreground text-sm">
                  Deep dive into Next.js caching: fetch caching, unstable cache, revalidation, and more.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </div>

        {/* Caching Sub-features */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Caching Features</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/caching/fetch"
              className="p-4 border rounded-lg hover:border-primary transition-colors text-sm"
            >
              <span className="font-medium">Fetch Caching</span>
              <p className="text-muted-foreground text-xs mt-1">
                Test force-cache, no-store, and revalidation options
              </p>
            </Link>
            <Link
              href="/caching/unstable-cache"
              className="p-4 border rounded-lg hover:border-primary transition-colors text-sm"
            >
              <span className="font-medium">Unstable Cache</span>
              <p className="text-muted-foreground text-xs mt-1">
                Cache with tags and revalidation
              </p>
            </Link>
            <Link
              href="/caching/static-revalidate"
              className="p-4 border rounded-lg hover:border-primary transition-colors text-sm"
            >
              <span className="font-medium">Time-based Revalidation</span>
              <p className="text-muted-foreground text-xs mt-1">
                Static pages with time-based revalidation (10s)
              </p>
            </Link>
            <Link
              href="/caching/on-demand-revalidate"
              className="p-4 border rounded-lg hover:border-primary transition-colors text-sm"
            >
              <span className="font-medium">On-demand Revalidation</span>
              <p className="text-muted-foreground text-xs mt-1">
                Revalidate via tag or path on demand
              </p>
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/dynamic"
              className="text-sm text-primary hover:underline"
            >
              Dynamic Rendering →
            </Link>
            <Link
              href="/dashboard"
              className="text-sm text-primary hover:underline"
            >
              Dashboard →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
