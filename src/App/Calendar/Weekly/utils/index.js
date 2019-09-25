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

export const isInHour = hourStart => time => {
	const hourEnd = new Date(hourStart)
	hourEnd.setHours(hourStart.getHours() + 1)
	return time >= hourStart && time < hourEnd
}

export const isEventInHour = hour => event => {
	const nextHour = new Date(hour)
	nextHour.setHours(nextHour.getHours() + 1)

	const eventStart = new Date(event.start)
	const eventEnd = new Date(event.end)

	const eventStartsInHour = eventStart >= hour && eventStart < nextHour
	const eventEndsInHour = eventEnd > hour && eventEnd <= nextHour
	const eventDuringHour = hour >= eventStart && hour < eventEnd

	return eventStartsInHour || eventEndsInHour || eventDuringHour
}

export const getHoursEvents = (day, events) => {
	const hour = new Date(`${day.year}/${day.month}/${day.date}`)
	hour.setHours(day.hour)
	return events.filter(isEventInHour(hour))
}
