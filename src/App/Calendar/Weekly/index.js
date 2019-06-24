import React from 'react'
import { EventConsumer } from '../../EventContext'
import Hour from './Hour'

export const toTimeString = (num) => {
	switch (num.toString().length) {
		case 1:
			return `0${num}:00`
		case 2:
			return `${num}:00`
		default:
			console.log(`Err: incorrect time format, expected 1-2 digit number, got: ${num}`)
			return ``
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

/* TODO: Rename and Rearrange Refactor
 * A lot of days/hours/years show up in various parts of code
 * Daily filter is in EventContext but Hourly is local here
 * Filter runs in O(n) time which *may* not be a problem
 *   but need to check for slower devices
 */
export const filterByHour = (hour, events) =>
	events.filter(event => {
		const eventDate = new Date(event.start)
		const nextHour = new Date(hour)
		nextHour.setHours(hour.getHours() + 1)
		return eventDate >= hour && eventDate < nextHour
	})

export const getHoursEvents = ({year, month, day, hour}, filterTodaysEvents) => {
	const daysEvents = filterTodaysEvents(year, month, day)

	const startHour = new Date(`${year}/${month}/${day}`)
	startHour.setHours(hour)

	return filterByHour(startHour, daysEvents)
}

export const hours = new Array(24).fill().map((_, i) => i)

// TODO: should receive a callback from Calendar to add
// the days of the week to table column headers
export default (date) =>
	hours.map((hour, i) =>
		<tr role="row" key={i}>
			<th role="rowheader" scope="row">{toTimeString(hour)}</th>
			<EventConsumer>{({ filterTodaysEvents }) => {
				const days = getWeek(date)
				return days.map((day, i) => {
					const now = {year: date.year, month: date.month, day, hour}
					const events = getHoursEvents(now, filterTodaysEvents)
					return <Hour key={i} events={events} />
				})
			}}</EventConsumer>
		</tr>
	)
