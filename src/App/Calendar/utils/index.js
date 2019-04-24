export const incWeek = (year, month, day) => {
	const d = new Date(year, month-1, parseInt(day)+7)
	return `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`
}

export const decWeek = (year, month, day) => {
	const d = new Date(year, month-1, day-7)
	return `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`
}

export const incMonth = (year, month) => {
	// we 1 index month, Date object 0 indexes, so no addition necessary
	const d = new Date(year, month)
	return `${d.getFullYear()}/${d.getMonth()}`
}
export const decMonth = (year, month) => {
	// we 1 index month, Date object 0 indexes, so subtract two
	const d = new Date(year, month-2)
	return `${d.getFullYear()}/${d.getMonth()}`
}

export const getMonthName = (month) => {
	// blank entry to index January to 1
	const months = ['','January','February','March','April','May','June','July','August','September','October','November','December']
	return months[month]
}
