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
  }
]; 