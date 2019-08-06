import { toDateString } from '../../../utils'

export const getMonthName = (month) => {
	const index = month % 12
	const months = ['December', 'January','February','March','April','May','June','July','August','September','October','November']
	return months[index]
}

export const incWeek = (year, month, day) => {
	return toDateString(new Date(year, month-1, parseInt(day)+7))
}

export const decWeek = (year, month, day) => {
	return toDateString(new Date(year, month-1, day-7))
}

export const incMonth = (year, month, day) => {
	return toDateString(changeMonth(year, month, day, 'inc'))
}

export const decMonth = (year, month, day) => {
	return toDateString(changeMonth(year, month, day, 'dec'))
}

// This code is impossible to reason about and shouldn't be aware of the 1 indexing
// of the Date source. TODO: Refactor

// Source of truth for date is user visible and therefore month is 1 indexed
// JS Date's month is 0 indexed so lots of off-by-ones in the following code

export const changeMonth = (year, month, day, dir) => {
	const today = new Date(year, month-1, day)
	// setting day to zero sets us to last day of prev month
	// so extra +1 on pev/next
	switch(dir) {
		case 'inc':
			const next = new Date(year, month+1, 0)
			if (today.getDate() >= next.getDate()) {
				return next
			}
			return new Date(year, month, day)
		case 'dec':
			const prev = new Date(year, month-1, 0)
			if (today.getDate() >= prev.getDate()) {
				return prev
			}
			return new Date(year, month-2, day)
		default:
			console.log(`Err: correctDay only accepts 2 directions, given ${dir}`)
	}
}
