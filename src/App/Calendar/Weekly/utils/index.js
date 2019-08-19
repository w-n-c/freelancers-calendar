export const getWeek = ({year, month, date}) => {
	// set date to the Sunday (first day) of given week
	const day = new Date(`${year}/${month}/${date}`)
	day.setDate(day.getDate() - day.getDay())
	const week = []
	while (week.length < 7) {
		week.push(day.getDate())
		day.setDate(day.getDate() + 1)
	}
	return week
}

export const lengthInHours = (t1, t2) =>
	Math.abs(
		(new Date(t1) - new Date(t2))
		/ 3600000
	)
