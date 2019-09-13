import React, { useState } from 'react'
import { Router, Redirect } from '@reach/router'
import { throttle } from 'lodash'
import './App.css'
import Header from './Header'
import Calendar from './Calendar'
import { EventProvider } from './EventContext'
import { toDateString } from './utils'

export const App = () => {
	const [today, setToday] = useState(toDateString(new Date()))

	const options = {leading: true, trailing: true}
	const handleUpdateToday = throttle(
		() => setToday(toDateString(new Date())),
		1000,
		options
	)
	
	return (
		<EventProvider>
			<Router>
				<Redirect noThrow from="/" to={`monthly/${today}`} />
				<Header path="/:view/:year/:month/:date/*" today={today} />
			</Router>
			<Calendar handleUpdateToday={handleUpdateToday} />
		</EventProvider>
	)
}
