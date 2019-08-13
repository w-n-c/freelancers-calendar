import React from 'react'
import { EventConsumer } from '../../EventContext'
import Days from './Days'
import { chunk, getDaysOfMonth } from './utils'


// this will read a little awkwardly but should work until we make a tagged template to parse the numbers
const makeAriaHeader = week => makeWeekRangeString(week[0].date, week[6].date)
const makeWeekRangeString = (start, end) => `Week of the ${start} to the ${end}`

const makeWeeks = (daysOnCalendar, handleClick) =>
	// split the days into week long arrays to divide into week-long sections
	// then map over each week.
	chunk(daysOnCalendar, 7).map((daysOfWeek, i) =>
		<section role="row" key={i}>
			<h2 role="rowheader" className="aria-only">{makeAriaHeader(daysOfWeek)}</h2>
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
