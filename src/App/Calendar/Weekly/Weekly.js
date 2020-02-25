import React, { useContext } from 'react'
import { extend, pick } from 'lodash/fp'
import EventContext from '../../EventContext'
import Hour from './Hour'
import { hours, getWeek, eventsInHour } from './utils'
import { formatTime, dateFromDay, handleEventClick as handleClick } from '../utils'

export const Weekly = (props) => {
	const seedDay = pick(['year', 'month', 'date'], props)
	const { filterTodaysEvents } = useContext(EventContext)
	const days = getWeek(seedDay)

	return <div className="weekly" role="rowgroup">
		{hours.map((hour, i) =>
			<section role="row" key={i}>
				<h3 role="rowheader">{formatTime(`${hour}:00`)}</h3>
				{days.map((day, i) => {
					const now = extend(day, {hour})
					const todaysEvents = filterTodaysEvents(now)
					const events = eventsInHour(now, todaysEvents)
					return <Hour
						now={dateFromDay(now)}
						key={i}
						events={events}
						navLink={handleClick(props.navigate)}
					/>
				})}
			</section>
		)}
	</div>
}
