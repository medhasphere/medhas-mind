"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface PricingToggleProps {
  onToggle: (isYearly: boolean) => void
  defaultYearly?: boolean
}

export function PricingToggle({ onToggle, defaultYearly = true }: PricingToggleProps) {
  const [isYearly, setIsYearly] = useState(defaultYearly)

  const handleToggle = (yearly: boolean) => {
    setIsYearly(yearly)
    onToggle(yearly)
  }

  return (
    <div className="flex flex-col items-center justify-center mb-12 space-y-4">
      <div className="bg-muted p-1 rounded-lg flex">
        <Button
          variant={!isYearly ? "default" : "ghost"}
          size="sm"
          onClick={() => handleToggle(false)}
          className={`px-6 ${!isYearly ? "bg-background shadow-sm" : ""}`}
        >
          Monthly
        </Button>
        <Button
          variant={isYearly ? "default" : "ghost"}
          size="sm"
          onClick={() => handleToggle(true)}
          className={`px-6 ${isYearly ? "bg-background shadow-sm" : ""}`}
        >
          Yearly
        </Button>
      </div>

      {isYearly && (
        <Badge className="bg-green-100 text-green-700 border-green-200 animate-pulse">
          💰 Save 20% with yearly billing
        </Badge>
      )}
    </div>
  )
}
