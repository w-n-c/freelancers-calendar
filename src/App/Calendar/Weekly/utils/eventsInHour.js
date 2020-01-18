import { nextHour } from '../../utils'
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
