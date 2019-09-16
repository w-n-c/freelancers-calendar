import React, { useContext } from 'react'
import { extend, pick } from 'lodash/fp'
import EventContext from '../../EventContext'
import Hour from './Hour'
import { hours, getWeek, getHoursEvents } from './utils'
import { formatTime, handleEventClick as handleClick } from '../utils'

export default (props) => {
	const day = pick(['year', 'month', 'date'], props)
	const { filterTodaysEvents } = useContext(EventContext)
	const days = getWeek(day)

	return <div className="weekly" role="rowgroup">
		{hours.map((hour, i) =>
			<section role="row" key={i}>
				<h3 role="rowheader">{formatTime(`${hour}:00`)}</h3>
				{days.map((date, i) => {
					const now = extend(day, {date, hour})
					const todaysEvents = filterTodaysEvents(now)
					const events = getHoursEvents(now, todaysEvents)
					return <Hour
						key={i}
						events={events}
						handleClick={handleClick(props.navigate)}
						/>
				})}
			</section>
		)}
	</div>
}
