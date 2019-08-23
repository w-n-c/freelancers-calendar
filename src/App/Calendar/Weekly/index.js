import React, { useContext } from 'react'
import { extend } from 'lodash/fp'
import EventContext from '../../EventContext'
import Hour from './Hour'
import { getWeek } from './utils'
import { formatTime } from '../utils'

// move to EventContext
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

export const hours = new Array(24).fill().map((_, i) => i)

// TODO: should receive a callback from Calendar to add
// the days of the week to table column headers
export default (day, handleClick) => {
	const { filterTodaysEvents } = useContext(EventContext)
	const days = getWeek(day)

	return <div className="weekly" role="rowgroup">
		{hours.map((hour, i) =>
			<section role="row" key={i}>
				<h3 role="rowheader">{formatTime(`${hour}:00`)}</h3>
				{days.map((date, i) => {
					const now = extend(day, {date, hour})
					const events = getHoursEvents(now, filterTodaysEvents)
					return <Hour key={i} time={now} events={events} handleClick={handleClick}/>
				})}
			</section>
		)}
	</div>
}
