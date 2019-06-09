import React from 'react'
import { EventConsumer } from '../../EventContext'
import Days from './Days'
import { chunk, getDaysOfMonth } from './utils'


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
