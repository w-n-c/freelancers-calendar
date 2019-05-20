import React from 'react'
import { EventConsumer } from '../../EventContext'
import Days from './Days'
import { chunk } from './utils'

// TODO: test getDaysOfMonth
export const getDaysOfMonth = (year, month, day) => {
	const date = new Date(`${year}/${month}/${day}`)
	// sets date to the first sunday that should appear on the calendar
	// will regularly be a day from the previous month
	date.setDate(1)
	date.setDate(1 - date.getDay())

	// Monthly view contains 7 days x 5 weeks,
	// so create an array of objects containing each date.
	// Later code uses the date to filter which events to add to the object
	const days = Array(7 * 5).fill()
	return days.map(() => {
		// later code assumes this date is set to midnight
		const today = date.getDate()
		date.setDate(today + 1)
		return { date: today } 
	})
}

// TODO: test bracket for refactor
export default ({year, month, day}) =>
	<EventConsumer>{({ filterTodaysEvents }) => {
		// add day's events to the date object
		const daysOfMonth = getDaysOfMonth(year, month, day)
			.map(dayInMonth => {
				dayInMonth.events = filterTodaysEvents(year, month, dayInMonth.date)
				return dayInMonth
			})
		// split the days into week long arrays to add necessary table row elements
		const weeks = chunk(daysOfMonth, 7)
		return weeks.map((week, i) =>
			<tr role="row" key={i}>
				<Days days={week} />
			</tr>
		)
	}}</EventConsumer>
