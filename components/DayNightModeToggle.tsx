'use client'

import * as React from 'react'
import { Moon, Sun, LocateFixed } from 'lucide-react'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useDayNightMode, type DayNightMode } from '@/components/day-night-mode-provider'

export function DayNightModeToggle({ className }: { className?: string }) {
  const { mode, setMode } = useDayNightMode()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <ToggleGroup
      type="single"
      value={mode}
      onValueChange={(value) => {
        if (!value) return
        setMode(value as DayNightMode)
      }}
      variant="outline"
      className={className}
      aria-label="Theme mode"
    >
      <ToggleGroupItem value="auto" aria-label="Auto (sunrise/sunset)">
        <LocateFixed className="h-4 w-4" />
        <span className="hidden sm:inline">Auto</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="day" aria-label="Day mode">
        <Sun className="h-4 w-4" />
        <span className="hidden sm:inline">Day</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="night" aria-label="Night mode">
        <Moon className="h-4 w-4" />
        <span className="hidden sm:inline">Night</span>
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

