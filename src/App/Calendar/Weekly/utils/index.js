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

export const lengthInHours = (t1, t2) =>
	Math.abs(
		(new Date(t1) - new Date(t2))
		/ 3600000
	)
