"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { navigationItems } from "@/config/navigation";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Vercel",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Cloudflare",
      logo: AudioWaveform,
      plan: "Workers",
    },
    {
      name: "Cloudflare",
      logo: Command,
      plan: "Container",
    }
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  // Map navigationItems to NavMain's expected structure
  const navMainItems = navigationItems.map((item) => {
    // Check if any child matches the current pathname
    const hasActiveChild = item.children?.some((child) => child.href === pathname) ?? false
    
    // Check if the parent item itself is active (for items without children)
    const isParentActive = item.href === pathname

    return {
      title: item.label,
      url: item.href || "#",
      icon: item.icon,
      isActive: hasActiveChild || isParentActive,
      items: item.children?.map((sub) => ({
        title: sub.label,
        url: sub.href,
        isActive: sub.href === pathname,
      })),
    }
  });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
