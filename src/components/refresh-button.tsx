"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface RefreshButtonProps {
  label?: string;
}

export function RefreshButton({ label = 'Refresh' }: RefreshButtonProps) {
  const router = useRouter()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    router.refresh()
    // Add a small delay to show the loading state
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  return (
    <Button 
      variant="outline" 
      className="flex items-center gap-2"
      onClick={handleRefresh}
      disabled={isRefreshing}
    >
      <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
      {isRefreshing ? 'Refreshing...' : label}
    </Button>
  )
}
