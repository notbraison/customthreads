const rad = Math.PI / 180
const dayMs = 1000 * 60 * 60 * 24

// Julian dates
const J1970 = 2440588
const J2000 = 2451545

// Auxiliary constants
const J0 = 0.0009
const e = rad * 23.4397 // obliquity of the Earth

function toJulian(date: Date) {
  return date.valueOf() / dayMs - 0.5 + J1970
}

function fromJulian(j: number) {
  return new Date((j + 0.5 - J1970) * dayMs)
}

function toDays(date: Date) {
  return toJulian(date) - J2000
}

function solarMeanAnomaly(d: number) {
  return rad * (357.5291 + 0.98560028 * d)
}

function eclipticLongitude(M: number) {
  const C =
    rad *
    (1.9148 * Math.sin(M) +
      0.02 * Math.sin(2 * M) +
      0.0003 * Math.sin(3 * M))
  const P = rad * 102.9372 // perihelion of the Earth
  return M + C + P + Math.PI
}

function declination(L: number) {
  return Math.asin(Math.sin(L) * Math.sin(e))
}

function julianCycle(d: number, lw: number) {
  return Math.round(d - J0 - lw / (2 * Math.PI))
}

function approxTransit(Ht: number, lw: number, n: number) {
  return J0 + (Ht + lw) / (2 * Math.PI) + n
}

function solarTransitJ(ds: number, M: number, L: number) {
  return J2000 + ds + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * L)
}

function hourAngle(h: number, phi: number, dec: number) {
  const cosH =
    (Math.sin(h) - Math.sin(phi) * Math.sin(dec)) /
    (Math.cos(phi) * Math.cos(dec))

  if (cosH <= -1) return 0 // always above altitude
  if (cosH >= 1) return Math.PI // always below altitude

  return Math.acos(cosH)
}

function getSetJ(h: number, lw: number, phi: number, dec: number, n: number, M: number, L: number) {
  const w = hourAngle(h, phi, dec)
  const a = approxTransit(w, lw, n)
  return solarTransitJ(a, M, L)
}

export type SunTimes = {
  solarNoon: Date
  sunrise: Date | null
  sunset: Date | null
}

export function getSunTimes(date: Date, lat: number, lng: number): SunTimes {
  const lw = rad * -lng
  const phi = rad * lat

  const d = toDays(date)
  const n = julianCycle(d, lw)
  const ds = approxTransit(0, lw, n)

  const M = solarMeanAnomaly(ds)
  const L = eclipticLongitude(M)
  const dec = declination(L)

  const Jnoon = solarTransitJ(ds, M, L)

  const h0 = -0.833 * rad
  const Jset = getSetJ(h0, lw, phi, dec, n, M, L)
  const Jrise = Jnoon - (Jset - Jnoon)

  const solarNoon = fromJulian(Jnoon)
  const sunrise = fromJulian(Jrise)
  const sunset = fromJulian(Jset)

  // Handle polar day/night edge cases: treat as no sunrise/sunset for the day.
  if (!Number.isFinite(sunrise.valueOf()) || !Number.isFinite(sunset.valueOf())) {
    return { solarNoon, sunrise: null, sunset: null }
  }

  return { solarNoon, sunrise, sunset }
}

