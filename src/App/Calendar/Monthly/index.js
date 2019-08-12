import React from 'react'
import { EventConsumer } from '../../EventContext'
import Days from './Days'
import { chunk, getDaysOfMonth } from './utils'

// This could use a refactor, its... messy

const makeWeeks = (daysOnCalendar, handleClick) =>
	// split the days into week long arrays to add necessary table row elements
	// then map over each week.
	chunk(daysOnCalendar, 7).map(
		(daysOfWeek, i) => <section className="week" role="row" key={i}>
			<h3 role="rowheader" className="aria-only">{''/*'Week of 24-30*/}</h3>
			<Days days={daysOfWeek} handleClick={handleClick} />
		</section>
	)

export default ({year, month, day: date, handleClick}) =>
	<EventConsumer>{({ filterTodaysEvents }) => {
		// returns an array of objects with each day's year, month, and date listed
		// produces 6 weeks worth of days
		const daysOfMonth = getDaysOfMonth(year, month, date)
			.map(day => {
				// add day's events to the date object
				day.events = filterTodaysEvents(day.year, day.month, day.date)
				return day
			})
		return makeWeeks(daysOfMonth, handleClick)
	}}</EventConsumer>
