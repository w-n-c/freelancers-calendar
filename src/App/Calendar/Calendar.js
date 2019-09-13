import React from 'react'
import { Router } from '@reach/router'
import Event from './Event'
import Monthly from './Monthly'
import Weekly from './Weekly'
import CalendarHeader from './CalendarHeader'

export const Calendar = ({handleUpdateToday}) => {

	const handleMouseMove = (e) => {
		e.preventDefault()
		handleUpdateToday()
	}

	return [
		<main key="1" onMouseMove={handleMouseMove} role="grid">
			<Router>
				<CalendarHeader path=":route/:year/:month/:date/*" />
			</Router>
			<Router>
				<Monthly path="monthly/:year/:month/:date/*" />
				<Weekly path="weekly/:year/:month/:date/*" />
			</Router>
		</main>,
		<section key="2" >
			<Router>
				<Event path=":route/:year/:month/:date/events/:id" />
			</Router>
		</section>
	]
}
