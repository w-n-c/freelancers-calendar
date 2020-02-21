import React, { useContext } from 'react'
import { pick, map, extend, chunk, compose } from 'lodash/fp'
import EventContext from '../../EventContext'
import SectionHeader from '../SectionHeader'
import Days from './Days'
import { getDaysOfMonth } from './utils'
import { handleEventClick, isToday } from '../utils'


// screen reads a little awkwardly but should work until we make
// a tagged template to parse the numbers
const makeAriaHeader = week => makeWeekRangeString(week[0].date, week[6].date)
const makeWeekRangeString = (start, end) => `Week of the ${start} to the ${end}`

export const Monthly = (props) => {
	const day = pick(['year', 'month', 'date'], props)
	const navLink = handleEventClick(props.navigate)

	const { filterTodaysEvents } = useContext(EventContext)

	const addEvents = (day) => extend(day, { events: filterTodaysEvents(day)})
	const addToday = (day) => extend(day, isToday(day, props.today))

	const addInfo = compose(addEvents, addToday)
	const daysOfMonth = map(addInfo, getDaysOfMonth(day))
	const weeksOfMonth = chunk(7, daysOfMonth)

	return <div className="monthly" role="rowgroup">
		{weeksOfMonth.map((daysOfWeek, i) =>
			<section role="row" key={i}>
				<SectionHeader
					role="rowheader"
					className="aria-only"
					ariaHeader={makeAriaHeader(daysOfWeek)}
				/>
				<Days days={daysOfWeek} navLink={navLink} />
			</section>
		)}
	</div>
}
