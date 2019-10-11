import React from 'react'
import { compose } from 'lodash/fp'
import EventList from './EventList'
import { dateFromDay, newEventQuery } from '../utils'

const eventQuery = (navLink) => compose(navLink, newEventQuery, dateFromDay)
const handleClick = (navLink, day) => {
	day.hour = new Date().getHours()
	return eventQuery(navLink)(day)
}

export default ({days, navLink}) =>
	days.map((day, i) =>
		<article role="gridcell" key={i} onClick={(e) => handleClick.call(undefined, navLink, day)}>
			<h4>{day.date}</h4>
			<EventList handleClick={navLink} events={day.events} />
		</article>
	)
