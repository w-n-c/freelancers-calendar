import React from 'react'
import { Router } from '@reach/router'
import './App.css'
import Header from './Header'
import Calendar from './Calendar'
import EventContext from './EventContext'
import { FAKE_TODOS } from './api'

export class App extends React.Component {
	state = {
		events: FAKE_TODOS,
		today: this.getTodaysDate()
	}

	getTodaysDate() {
		const today = new Date()
		return `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`
	}

	render() {
		return (
			<div className="App">
				<Router>
					<Header today={this.state.today} path="/:view/:year/:month/:day" />
				</Router>
				<EventContext.Provider value={this.state.events}>
					<Router>
						<Calendar events={this.state.events} path="/:view/:year/:month/:day"/>
					</Router>
				</EventContext.Provider>
			</div>
		)
	}
}
