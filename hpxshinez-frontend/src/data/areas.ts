/** Cities we serve, shown as chips in AreasHours and condensed in the hero. */
export const AREAS = [
  'Minneapolis',
  'Columbia Heights',
  'Fridley',
  'Coon Rapids',
  'St. Anthony',
  'St. Paul',
  'Edina',
  'Richfield',
] as const

export const HOURS = [
  { days: 'Monday to Friday', time: '5PM to 8PM' },
  { days: 'Saturday & Sunday', time: '10AM to 7PM' },
] as const

const HERO_CITY_PREVIEW = 3

/** Pieces for the hero condensed line so both layouts share one derivation. */
export function heroServiceLine() {
  const previewCities = AREAS.slice(0, HERO_CITY_PREVIEW)
  const moreCount = Math.max(0, AREAS.length - HERO_CITY_PREVIEW)
  const hours = HOURS.map((row) => `${row.days} ${row.time}`).join(', ')
  return { previewCities, moreCount, hours }
}
