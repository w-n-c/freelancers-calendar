import React, { useContext } from 'react'
import EventContext from '../../EventContext'
import Days from './Days'
import { chunk, getDaysOfMonth } from './utils'


// screen reads a little awkwardly but should work until we make
// a tagged template to parse the numbers
const makeAriaHeader = week => makeWeekRangeString(week[0].date, week[6].date)
const makeWeekRangeString = (start, end) => `Week of the ${start} to the ${end}`

export default ({year, month, day, handleClick}) => {
	const { filterTodaysEvents } = useContext(EventContext)

	// returns an array of objects with each day's year, month, and date listed
	// produces 6 weeks worth of days
	const daysOfMonth = getDaysOfMonth({year, month, day})
		.map(day => {
			day.events = filterTodaysEvents(day)
			return day
		})

		const makeWeeks = (daysOnCalendar, handleClick) => {
			return chunk(daysOnCalendar, 7).map(
				(daysOfWeek, i) =>
					<section role="row" key={i}>
						<h2 role="rowheader" className="aria-only">{makeAriaHeader(daysOfWeek)}</h2>
						<Days days={daysOfWeek} handleClick={handleClick} />
					</section>
			)
		}
	return makeWeeks(daysOfMonth, handleClick)
}
