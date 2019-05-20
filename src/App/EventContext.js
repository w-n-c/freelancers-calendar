import React from 'react'
import { fetchEvents } from './api'

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
		const daysEvents = this.state.events.filter(event => {
			return event.start >= startDate && event.start < endDate
		})
		return daysEvents
	}

	// 'delete' > 'destroy' because its the same number of characters as
	// 'create' and 'update' (ocd much?) for this use it means the same thing
	handleCreateEvent(){}
	handleUpdateEvent(){}
	handleDeleteEvent(){}

	render() {
		return (
			<Provider value={{
				...this.state,
				filterTodaysEvents: this.filterTodaysEvents,
				onCreateEvent: this.handleCreateEvent,
				onUpdateEvent: this.handleUpdateEvent,
				onDeleteEvent: this.handleDeleteEvent,
			}}>{this.props.children}</Provider>
		)
	}
}


export { EventProvider, Consumer as EventConsumer }
