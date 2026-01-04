import type { LinkProps } from "next/link";
import { Home, Info, BookOpen, Layers, type LucideIcon, LeafyGreen, HardDrive, Zap, Route } from "lucide-react";

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
    label: "Components",
    icon: Layers,
    children: [
      {
        label: "Navigation Menu",
        href: "/docs/components/navigation-menu",
        description: "A collection of links for navigating websites."
      },
      {
        label: "Button",
        href: "/docs/components/button",
        description: "Displays a button or a component that looks like a button."
      },
      {
        label: "test",
        href: "/docs/components/test",
        description: "Displays a button or a component that looks like a button."
      }
    ]
  },
  {
    label: "Large Menu",
    icon: LeafyGreen,
    children: [
      {
        label: "Navigation Menu",
        href: "/docs/components/navigation-menu",
        description: "A collection of links for navigating websites."
      },
      {
        label: "Button",
        href: "/docs/components/button",
        description: "Displays a button or a component that looks like a button."
      },
			{
				label: "Navigation Menu",
				href: "/docs/components/navigation-menu",
				description: "A collection of links for navigating websites."
			},
			{
				label: "Button2",
				href: "/docs/components/button2",
				description: "Displays a button or a component that looks like a button."
			},
			{
				label: "Card",
				href: "/docs/components/card",
				description: "A card is a container with a title and a description."
			},
			{
				label: "Card2",
				href: "/docs/components/card2",
				description: "A card is a container with a title and a description."
			},
    ]
  },
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