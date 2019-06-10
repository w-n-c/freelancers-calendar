import React from 'react'
import { fetchEvents } from './api'
const uuid = require('nanoid/async')

const { Provider, Consumer } = React.createContext()

class EventProvider extends React.Component {
	state = {
		events: [],
		loading: false,
		error: ''
	}

	componentDidMount() {
		this.setState({ loading: true, error: '' })
		fetchEvents()
			.then(events => this.setState({ loading: false, events }))
			.catch(error => this.setState({ loading: false, error}))
	}

	filterTodaysEvents = (year, month, day) => {
		const startDate = new Date(`${year}/${month}/${day}`)
		const endDate = new Date(startDate); endDate.setHours(24)

		return this.state.events.filter(event => {
			const eventStart = new Date(event.start)
			return eventStart >= startDate && eventStart < endDate
		})
	}

	// TODO: handlers should return promises
	createEvent = (event) => {
		event.id = uuid()
		// POST event to server
		// on success:
		const events = [...this.state.events, event]
		this.setState({ events })
		return true
	}

	updateEvent = (update) => {
		const events = [...this.state.events]
		const eventIndex = events.findIndex(
			event => event.id === update.id
		)
		events[eventIndex] = update
		this.setState({ events })
		return true
	}

	handleDeleteEvent = (deleted) => {
		const events = [...this.state.events]
		const eventIndex = events.findIndex(
			event => event.id === deleted.id
		)
		events.splice(eventIndex, eventIndex+1)
		this.setState({ events })
		return true
	}

	render() {
		return (
			<Provider value={{
				...this.state,
				filterTodaysEvents: this.filterTodaysEvents,
				handleCreateEvent: this.createEvent,
				handleUpdateEvent: this.updateEvent,
				handleDeleteEvent: this.deleteEvent,
			}}>{this.props.children}</Provider>
		)
	}
}


export { EventProvider, Consumer as EventConsumer }
