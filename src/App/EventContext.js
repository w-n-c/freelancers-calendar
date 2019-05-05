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

	// 'delete' > 'destroy' because its the same number of characters as
	// 'create' and 'update' (ocd much?) for this use it means the same thing
	handleCreateEvent(){}
	handleUpdateEvent(){}
	handleDeleteEvent(){}

	render() {
		return (
			<Provider value={{
				...this.state,
				onCreateEvent: this.handleCreateEvent,
				onUpdateEvent: this.handleUpdateEvent,
				onDeleteEvent: this.handleDeleteEvent,
			}}>{this.props.children}</Provider>
		)
	}
}


export { EventProvider, Consumer as EventConsumer }
