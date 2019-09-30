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

export const hours = new Array(24).fill().map((_, i) => i)

export const lengthInHours = (t1, t2) =>
	Math.abs(
		(new Date(t1) - new Date(t2))
		/ 3600000
	)

export const dateFromDay = ({year, month, date, hour}) => {
	const dateObj = new Date(`${year}/${month}/${date}`)
	if (hour)
		dateObj.setHours(hour)
	return dateObj
}

export const nextHour = date => {
	const next = new Date(date)
	next.setHours(next.getHours() + 1)
	return next
}

export const isInHour = hour => time => {
	const hourStart = new Date(hour)
	const hourEnd = nextHour(hour)
	const thisTime = new Date(time)

	return thisTime >= hourStart && thisTime < hourEnd
}

export const isEventInHour = hour => event => {
	const hourEnd = nextHour(hour)
	const eventStart = new Date(event.start)
	const eventEnd = new Date(event.end)

	const startsInHour = eventStart >= hour && eventStart < hourEnd
	const endsInHour = eventEnd > hour && eventEnd <= hourEnd
	const moreThanHour = hour >= eventStart && hour < eventEnd

	return startsInHour || endsInHour || moreThanHour
}

export const eventsInHour = (day, events) => {
	const hour = new Date(`${day.year}/${day.month}/${day.date}`)
	hour.setHours(day.hour)
	return events.filter(isEventInHour(hour))
}
