import React, { useState } from 'react'
import { Router, Redirect } from '@reach/router'
import { throttle } from 'lodash'
import './App.css'
import CheckUser from './CheckUser'
import Header from './Header'
import Calendar from './Calendar'
import { EventProvider } from './EventContext'
import { UserProvider } from './UserContext'
import { toDateString } from './utils'

export const App = () => {
	const [today, setToday] = useState(toDateString(new Date()))

	const handleUpdateToday = throttle(
		() => setToday(toDateString(new Date())),
		1000,
		{ leading: true, trailing: true }
	)
	
	return (
		<UserProvider>
			<EventProvider>
				<Router>
					<CheckUser path="check_user" />
					<Redirect noThrow from="/" to={`calendar/monthly/${today}`} />
					<Header path="calendar/:view/:year/:month/:date/*" today={today} />
				</Router>
				<Calendar path="calendar/*" handleUpdateToday={handleUpdateToday} />
			</EventProvider>
		</UserProvider>
	)
}
