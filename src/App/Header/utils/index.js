import { toDateString } from '../../utils'
import { onView } from './onView'
export { url } from './url'
export { getMonthName } from './getMonthName'


export const incWeek = ({year, month, date}) =>
	toDateString(new Date(year, month-1, parseInt(date)+7))
export const decWeek = ({year, month, date}) =>
	toDateString(new Date(year, month-1, date-7))

export const incMonth = (day) => toDateString(changeMonth(day, 'inc'))
export const decMonth = (day) => toDateString(changeMonth(day, 'dec'))

export const incRoute = onView({ weekly: incWeek, monthly: incMonth })
export const decRoute = onView({ weekly: decWeek, monthly: decMonth })

// Change month exists to handle issues caused by months containing a varying number of days.

// This code is difficult to reason about and shouldn't be aware of the 1 indexing
// of the Date source. TODO: Refactor

// Source of truth for date is user visible and therefore month is 1 indexed
// JS Date's month is 0 indexed so lots of off-by-ones in the following code
export const changeMonth = ({year, month, date}, dir) => {
	const today = new Date(year, month-1, date)
	// setting day to zero sets us to last day of prev month
	// so extra +1 on pev/next
	switch(dir) {
		case 'inc':
			const next = new Date(year, month+1, 0)
			if (today.getDate() >= next.getDate()) {
				return next
			}
			return new Date(year, month, date)
		case 'dec':
			const prev = new Date(year, month-1, 0)
			if (today.getDate() >= prev.getDate()) {
				return prev
			}
			return new Date(year, month-2, date)
		default:
			console.log(`Err: correctDay only accepts 2 directions, given ${dir}`)
	}
}
