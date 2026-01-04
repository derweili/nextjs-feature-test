import type { LinkProps } from "next/link";
import { Home, Info, BookOpen, type LucideIcon, HardDrive, Zap, Route } from "lucide-react";

export type NavigationSubItem = {
  label: string;
  href: string;
  description: string;
  linkProps?: Partial<LinkProps>;
};

export type NavigationItem = {
  label: string;
  href?: string;
  icon?: LucideIcon;
  children?: NavigationSubItem[];
  linkProps?: Partial<LinkProps>;
};

export const navigationItems: NavigationItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: Info },
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "Server Action", href: "/server-action", icon: Zap },
  { label: "Route Handler", href: "/route-handler", icon: Route },
  {
    label: "Caching",
    icon: HardDrive,
    children: [
      {
        label: "Fetch Caching",
        href: "/caching/fetch",
        description: "Test fetch caching with force-cache, no-store, and revalidation."
      },
      {
        label: "Unstable Cache",
        href: "/caching/unstable-cache",
        description: "Test unstable_cache with tags and revalidation."
      },
      {
        label: "Revalidate Path",
        href: "/caching/revalidate-path",
        description: "Test revalidatePath functionality for path-based cache invalidation."
      },
      {
        label: "Revalidate Tag",
        href: "/caching/revalidate-tag",
        description: "Test revalidateTag functionality for tag-based cache invalidation."
      },
      {
        label: "Static page with time-based revalidation",
        href: "/caching/static-revalidate",
        description: "Test static page caching with time-based revalidation (10 seconds)."
      }
    ]
  }
]; 