import React from 'react'
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import './App.css'
import Header from './Header'
import Calendar from './Calendar'

export class App extends React.Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Header />
					<Route exact path="/" render={() => <Redirect to="/monthly" />}/>
					<Route path="/:view" component={Calendar} />
				</div>
			</Router>
		)
	}
}
