import React, {useContext, useEffect} from 'react'
import { Router } from '@reach/router'
import UserContext from '../UserContext'
import Event from './Event'
import Monthly from './Monthly'
import Weekly from './Weekly'
import CalendarHeader from './CalendarHeader'

export const Calendar = ({handleUpdateToday}) => {

	const handleMouseMove = (e) => {
		e.preventDefault()
		handleUpdateToday()
	}

	const { getUser } = useContext(UserContext)
	useEffect(() => {
		getUser()
		return () => getUser()
	})

	return [
		<main key="1" onMouseMove={handleMouseMove} role="grid">
			<Router>
				<CalendarHeader path="calendar/:route/:year/:month/:date/*" />
			</Router>
			<Router className="calendar">
				<Monthly path="calendar/monthly/:year/:month/:date/*" />
				<Weekly path="calendar/weekly/:year/:month/:date/*" />
			</Router>
		</main>,
		<Router key="2">
			<Event path="calendar/:route/:year/:month/:date/events/:id" />
		</Router>
	]
}
