// Formats an event's date, or a "start – end" range when endDate is set,
// so long-running events (e.g. a two-week workshop from 18 March to 1
// April) display sensibly instead of only ever showing the start date.
export function formatEventDate(date, endDate, { locale = 'en-GB', dateOptions = { day: 'numeric', month: 'long', year: 'numeric' } } = {}) {
  if (!date) return ''
  const start = new Date(date)
  if (!endDate) return start.toLocaleDateString(locale, dateOptions)

  const end = new Date(endDate)
  if (end.toDateString() === start.toDateString()) {
    return start.toLocaleDateString(locale, dateOptions)
  }

  // Weekday reads oddly when pairing two dates into a range (e.g. "Wednesday
  // 18 March – Wednesday 1 April"), so drop it for the range case only.
  const { weekday, ...rangeOptions } = dateOptions

  const sameMonthYear = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()
  if (sameMonthYear && rangeOptions.month && rangeOptions.year) {
    const startDay = start.toLocaleDateString(locale, { day: 'numeric' })
    return `${startDay} – ${end.toLocaleDateString(locale, rangeOptions)}`
  }

  return `${start.toLocaleDateString(locale, rangeOptions)} – ${end.toLocaleDateString(locale, rangeOptions)}`
}
