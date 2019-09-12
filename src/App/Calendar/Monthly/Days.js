import React from 'react'
import EventList from './EventList'

const newEvent = ({year, month, date}) => {
	const event = {}
	event.start = new Date(`${year}/${month}/${date}`).toISOString()
	event.end = event.start
	return event
}

export default ({days, handleClick}) =>
	days.map((day, i) =>
		<article role="gridcell" key={i} onClick={(e) => handleClick(newEvent(day))}>
			<h4>{day.date}</h4>
			<EventList events={day.events} />
		</article>
	)
