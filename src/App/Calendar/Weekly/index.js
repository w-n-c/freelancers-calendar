import React, { useContext } from 'react'
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
export default (date, handleClick) => {
	const { filterTodaysEvents } = useContext(EventContext)
	return hours.map((hour, i) => {
		const days = getWeek(date)
		return (
			<section role="row" key={i}>
				<h3 role="rowheader">{formatTime(`${hour}:00`)}</h3>
				{days.map((day, i) => {
					const now = {year: date.year, month: date.month, date: day, hour}
					const events = getHoursEvents(now, filterTodaysEvents)
					return <Hour key={i} date={now} events={events} handleClick={handleClick}/>
				})}
			</section>
		)
	})
}
