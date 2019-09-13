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

export const hours = new Array(24).fill().map((_, i) => i)

export const timeInHours = (t1, t2) =>
	Math.abs(
		(new Date(t1) - new Date(t2))
		/ 3600000
	)

export const filterByHour = (hour, events) =>
	events.filter(event => {
		const eventDate = new Date(event.start)
		const nextHour = new Date(hour)
		nextHour.setHours(hour.getHours() + 1)
		return eventDate >= hour && eventDate < nextHour
	})

export const getHoursEvents = (day, filterTodaysEvents) => {
	const daysEvents = filterTodaysEvents(day)
	const startHour = new Date(`${day.year}/${day.month}/${day.date}`)
	startHour.setHours(day.hour)
	return filterByHour(startHour, daysEvents)
}
