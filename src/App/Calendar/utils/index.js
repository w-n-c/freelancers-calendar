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

const dateToString = (d) => `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`

export const incWeek = (year, month, day) => {
	return dateToString(new Date(year, month-1, parseInt(day)+7))
}

export const decWeek = (year, month, day) => {
	return dateToString(new Date(year, month-1, day-7))
}

export const incMonth = (year, month, day) => {
	return dateToString(changeMonth(year, month, day, 'inc'))
}
export const decMonth = (year, month, day) => {
	return dateToString(changeMonth(year, month, day, 'dec'))
}

export const getMonthName = (month) => {
	if (month > 12) return ''
	// blank entry to index January to 1
	const months = ['','January','February','March','April','May','June','July','August','September','October','November','December']
	return months[month]
}
