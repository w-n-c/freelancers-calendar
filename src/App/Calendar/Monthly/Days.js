import React from 'react'
import EventList from './EventList'
import { handleEventClick as handleClick } from '../utils'

export default ({days, navigate}) =>
	days.map((day, i) =>
		<article role="gridcell" key={i} onClick={(e) => handleClick(navigate)('new')}>
			<h4>{day.date}</h4>
			<EventList handleClick={handleClick(navigate)} events={day.events} />
		</article>
	)
