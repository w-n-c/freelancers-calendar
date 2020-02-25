import React, { useContext, useEffect } from 'react'
import { Router } from '@reach/router'
import UserContext from '../UserContext'
import EventContext from '../EventContext'
import Event from './Event'
import Monthly from './Monthly'
import Weekly from './Weekly'
import CalendarHeader from './CalendarHeader'

export const Calendar = ({ today, handleUpdateToday }) => {

	const handleMouseMove = (e) => {
		e.preventDefault()
		handleUpdateToday()
	}

	const { getUser } = useContext(UserContext)
	const { checkEvents } = useContext(EventContext)

	useEffect(() => {
		getUser()
		checkEvents()
	})

	return [
		<main key="1" onMouseMove={handleMouseMove} role="grid">
			<Router>
				<CalendarHeader path="calendar/:route/:year/:month/:date/*" today={today} />
			</Router>
			<Router className="calendar">
				<Monthly path="calendar/monthly/:year/:month/:date/*" today={today} />
				<Weekly path="calendar/weekly/:year/:month/:date/*" today={today} />
			</Router>
		</main>,
		<Router key="2">
			<Event path="calendar/:route/:year/:month/:date/events/:id" />
		</Router>
	]
}
