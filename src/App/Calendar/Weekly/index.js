import React from 'react'
import { EventConsumer } from '../../EventContext'
import Hour from './Hour'
import { intToTimeString } from '../utils'
import { getWeek } from './utils'

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
			<th role="rowheader" scope="row">{intToTimeString(hour)}</th>
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
