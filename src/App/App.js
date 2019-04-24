import React from 'react'
import { Router, Redirect } from '@reach/router'
import './App.css'
import Calendar from './Calendar'
import EventContext from './EventContext'
import { FAKE_TODOS } from './api'

export class App extends React.Component {
	state = {
		events: FAKE_TODOS,
		// TODO: today's date should regularly update
		today: this.getTodaysDate()
	}

	getTodaysDate() {
		const today = new Date()
		return `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`
	}

	render() {
		return (
			<div className="App">
				<EventContext.Provider value={this.state.events}>
					<Router>
						<Redirect from="/" to={`monthly/${this.state.today}`} />
						<Calendar today={this.state.today} path="/:view/:year/:month/:day"/>
					</Router>
				</EventContext.Provider>
			</div>
		)
	}
}
