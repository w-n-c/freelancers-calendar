import React from 'react'
import { Router, Redirect } from '@reach/router'
import './App.css'
import Calendar from './Calendar'
import { EventProvider } from './EventContext'

export class App extends React.Component {
	state = {
		today: this.getTodaysDate()
	}

	componentDidMount() {
		// set a timeout to hit on midnight, updating today's date
		// at midnight, set an interval for every midnight to update today's date
		const today = new Date()
		const tomorrow = new Date(today.getDate()+1).setHours(0,0,0,0)
		// setHours returns milliseconds so no getTime() needed
		const timeout = tomorrow - today.getTime()
		const interval = 60*60*24*1000

		setTimeout(() => {
			this.setState({today: this.getTodaysDate()})
			this.intervalId = setInterval(
				() => this.setState({today: this.getTodaysDate()}),
				interval)
		}, timeout)
	}

	componentWillUnmount() {
		clearInterval(this.intervalId)
	}

	getTodaysDate() {
		const today = new Date()
		return `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`
	}

	render() {
		return (
			<EventProvider>
				<div className="App">
						<Router>
							<Redirect noThrow from="/" to={`monthly/${this.state.today}`} />
							<Calendar today={this.state.today} path="/:view/:year/:month/:day"/>
						</Router>
				</div>
			</EventProvider>
		)
	}
}
