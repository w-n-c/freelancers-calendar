// URL is source of truth for date, and for user readability is 1 indexed
// Date Obj's month is 0 indexed so lots of off by one
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

export const getWeek = ({year, month, day}) => {
	// set date to the Sunday (first day) of given week
	const date = new Date(`${year}/${month}/${day}`)
	date.setDate(date.getDate() - date.getDay())
	const week = []
	while (week.length < 7) {
		week.push(date.getDate())
		date.setDate(date.getDate() + 1)
	}
	return week
}

export const toDateString = (d) => `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`

export const toTimeString = (d) => {
	const time = d.toLocaleTimeString('en-us', { hour12: false })
	const secondsPosition = time.lastIndexOf(':')
	return time.slice(0, secondsPosition)
}

export const isoDateToCalStrings = (isoDate) => {
	const date = new Date(isoDate)
	return [toDateString(date), toTimeString(date)]
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

export const getMonthName = (month) => {
	if (month > 12) return ''
	// blank entry to index January to 1
	const months = ['','January','February','March','April','May','June','July','August','September','October','November','December']
	return months[month]
}
