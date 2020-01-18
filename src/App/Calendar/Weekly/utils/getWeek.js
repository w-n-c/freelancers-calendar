// Return the day of the month for each of the 7 days in the week of the given date
export const getWeek = ({year, month, date}) => {
	// set date to the Sunday (first day) of given week
	const day = new Date(`${year}/${month}/${date}`)
	day.setDate(day.getDate() - day.getDay())
	const week = []
	while (week.length < 7) {
		const year = day.getFullYear()
		const date = day.getDate()
		const month = day.getMonth() + 1
		week.push({year, month, date})

		// increment day
		day.setDate(day.getDate() + 1)
	}
	return week
}
