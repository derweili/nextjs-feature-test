"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { detectEnvironment, type Environment } from "@/config/environments"

export function TeamSwitcher({
  environments,
}: {
  environments: Environment[]
}) {
  const { isMobile } = useSidebar()
  const [activeEnvironment, setActiveEnvironment] = React.useState<Environment>(() => detectEnvironment())

  // Update environment when component mounts (client-side only)
  React.useEffect(() => {
    setActiveEnvironment(detectEnvironment())
  }, [])

  if (!activeEnvironment) {
    return null
  }

  const handleEnvironmentChange = (env: Environment) => {
    // Don't navigate if already on this environment
    if (activeEnvironment.name === env.name) {
      return
    }

    setActiveEnvironment(env)
    
    // Navigate to the environment URL, preserving the current path
    if (env.url && typeof window !== "undefined") {
      try {
        const currentPath = window.location.pathname + window.location.search
        const targetUrl = new URL(currentPath, env.url)
        window.location.href = targetUrl.toString()
      } catch (error) {
        // Fallback: just use the environment URL
        window.location.href = env.url
      }
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <activeEnvironment.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeEnvironment.name}</span>
                <span className="truncate text-xs">{activeEnvironment.description}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Environments
            </DropdownMenuLabel>
            {environments.map((env, index) => (
              <DropdownMenuItem
                key={env.name}
                onClick={() => handleEnvironmentChange(env)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <env.logo className="size-3.5 shrink-0" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{env.name}</span>
                  <span className="text-muted-foreground text-xs">{env.description}</span>
                </div>
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
