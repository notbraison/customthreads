'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'

import { getSunTimes, type SunTimes } from '@/lib/sun-times'

export type DayNightMode = 'auto' | 'day' | 'night'

type Coords = { lat: number; lng: number; at: number }

type DayNightModeContextValue = {
  mode: DayNightMode
  setMode: (next: DayNightMode) => void
  sunTimes: SunTimes | null
  coords: Coords | null
  isNight: boolean | null
}

const DayNightModeContext = React.createContext<DayNightModeContextValue | null>(null)

const MODE_KEY = 'tt-day-night-mode'
const COORDS_KEY = 'tt-day-night-coords'

function readJson<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

function writeJson(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore
  }
}

function isValidCoords(value: unknown): value is Coords {
  if (!value || typeof value !== 'object') return false
  const v = value as Record<string, unknown>
  return (
    typeof v.lat === 'number' &&
    Number.isFinite(v.lat) &&
    typeof v.lng === 'number' &&
    Number.isFinite(v.lng) &&
    typeof v.at === 'number' &&
    Number.isFinite(v.at)
  )
}

async function getCurrentCoords(): Promise<Coords | null> {
  if (!('geolocation' in navigator)) return null

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          at: Date.now(),
        })
      },
      () => resolve(null),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 6 * 60 * 60 * 1000 },
    )
  })
}

function hourFallbackIsNight(now: Date) {
  const hour = now.getHours()
  return hour < 6 || hour >= 18
}

function computeIsNight(now: Date, times: SunTimes | null) {
  if (!times?.sunrise || !times?.sunset) return hourFallbackIsNight(now)
  return now < times.sunrise || now >= times.sunset
}

function getNextAutoSyncAt(now: Date, times: SunTimes | null) {
  if (!times?.sunrise || !times?.sunset) {
    return new Date(now.valueOf() + 15 * 60 * 1000)
  }

  if (now < times.sunrise) return times.sunrise
  if (now < times.sunset) return times.sunset
  return new Date(now.valueOf() + 6 * 60 * 60 * 1000)
}

export function DayNightModeProvider({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme()

  const [mode, setModeState] = React.useState<DayNightMode>('auto')
  const [coords, setCoords] = React.useState<Coords | null>(null)
  const [sunTimes, setSunTimes] = React.useState<SunTimes | null>(null)
  const [isNight, setIsNight] = React.useState<boolean | null>(null)

  const timerRef = React.useRef<number | null>(null)

  const setMode = React.useCallback((next: DayNightMode) => {
    setModeState(next)
    writeJson(MODE_KEY, next)
  }, [])

  React.useEffect(() => {
    const stored = readJson<unknown>(MODE_KEY)
    if (stored === 'auto' || stored === 'day' || stored === 'night') {
      setModeState(stored)
    }

    const storedCoords = readJson<unknown>(COORDS_KEY)
    if (isValidCoords(storedCoords)) setCoords(storedCoords)
  }, [])

  React.useEffect(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }

    const applyTheme = (night: boolean) => {
      setTheme(night ? 'dark' : 'light')
      setIsNight(night)
    }

    if (mode === 'day') {
      setSunTimes(null)
      applyTheme(false)
      return
    }

    if (mode === 'night') {
      setSunTimes(null)
      applyTheme(true)
      return
    }

    let cancelled = false

    const sync = async () => {
      const now = new Date()

      let nextCoords = coords
      const coordsFreshEnough = nextCoords && Date.now() - nextCoords.at < 7 * 24 * 60 * 60 * 1000

      if (!coordsFreshEnough) {
        const fetched = await getCurrentCoords()
        if (cancelled) return
        if (fetched) {
          nextCoords = fetched
          setCoords(fetched)
          writeJson(COORDS_KEY, fetched)
        }
      }

      const nextTimes =
        nextCoords ? getSunTimes(now, nextCoords.lat, nextCoords.lng) : null

      if (cancelled) return

      setSunTimes(nextTimes)

      const night = computeIsNight(now, nextTimes)
      applyTheme(night)

      const nextAt = getNextAutoSyncAt(now, nextTimes)
      const delay = Math.max(15_000, nextAt.valueOf() - now.valueOf() + 1000)

      timerRef.current = window.setTimeout(sync, delay)
    }

    void sync()

    return () => {
      cancelled = true
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [coords, mode, setTheme])

  const value = React.useMemo<DayNightModeContextValue>(
    () => ({ mode, setMode, sunTimes, coords, isNight }),
    [coords, isNight, mode, setMode, sunTimes],
  )

  return <DayNightModeContext.Provider value={value}>{children}</DayNightModeContext.Provider>
}

export function useDayNightMode() {
  const ctx = React.useContext(DayNightModeContext)
  if (!ctx) throw new Error('useDayNightMode must be used within DayNightModeProvider')
  return ctx
}

