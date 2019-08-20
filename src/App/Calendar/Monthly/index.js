import React, { useContext } from 'react'
import { map, extend, chunk } from 'lodash/fp'
import EventContext from '../../EventContext'
import Days from './Days'
import { getDaysOfMonth } from './utils'


// screen reads a little awkwardly but should work until we make
// a tagged template to parse the numbers
const makeAriaHeader = week => makeWeekRangeString(week[0].date, week[6].date)
const makeWeekRangeString = (start, end) => `Week of the ${start} to the ${end}`

export default (date, handleClick) => {
	const { filterTodaysEvents } = useContext(EventContext)


	const addEvents = day => extend(day, { events: filterTodaysEvents(day)})
	const daysOfMonth = map(addEvents, getDaysOfMonth(date))
	const weeksOfMonth = chunk(7, daysOfMonth)

	const makeWeeks = (daysOnCalendar) => {
		return <div className="monthly" role="rowgroup">
			{weeksOfMonth.map(
				(daysOfWeek, i) =>
					<section role="row" key={i}>
						<h2 role="rowheader" className="aria-only">{makeAriaHeader(daysOfWeek)}</h2>
						<Days days={daysOfWeek} handleClick={handleClick} />
					</section>
			)}
		</div>
	}

	return makeWeeks(daysOfMonth, handleClick)
}
