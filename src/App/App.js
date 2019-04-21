import React from 'react'
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import './App.css'
import Header from './Header'
import Calendar from './Calendar'
import EventContext from './EventContext'
import { FAKE_TODOS } from './api'

export class App extends React.Component {
	state = {
		events: FAKE_TODOS
	}

	todaysDateURL() {
		const today = new Date()
		return `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`
	}

	render() {
		return (
			<Router>
				<div className="App">
					<Route
						path="/"
						render={(props) => <Header {...props}/>}
					/>
					<Route
						exact path="/"
						render={() => <Redirect to={`/monthly/${this.todaysDateURL()}`}/>}
					/>
					<EventContext.Provider value={this.state.events}>
						<Route
							path="/:view/:year/:month/:day"
							render={(props) => <Calendar {...props}/>}
						/>
					</EventContext.Provider>
				</div>
			</Router>
		)
	}
}
