import type { LinkProps } from "next/link";

export type NavigationSubItem = {
  label: string;
  href: string;
  description: string;
  linkProps?: Partial<LinkProps>;
};

export type NavigationItem = {
  label: string;
  href?: string;
  children?: NavigationSubItem[];
  linkProps?: Partial<LinkProps>;
};

export const navigationItems: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  {
    label: "Components",
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
      }
    ]
  }
]; 