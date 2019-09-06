import React, { useState } from 'react'
const events = require('./events.json')
const uuid = require('nanoid')

const EventContext = React.createContext()
const { Provider, Consumer } = EventContext

const EventProvider = (props) => {
	const [state, updateState] = useState({
		events,
		loading: false,
		error: ''
	})

	const setState = (state) => updateState(oldState => ({...oldState, ...state}))

	const filterTodaysEvents = ({year, month, date}) => {

		const isInDay = day => date => {
			const dayStart = new Date(day)
			const dayEnd = new Date(dayStart); dayEnd.setHours(24)
			const time = new Date(date)

			return time >= dayStart && time < dayEnd
		}

		const today = new Date(`${year}/${month}/${date}`).toISOString()
		const isToday = isInDay(today)
		const eventIsToday = event => isToday(event.start) || isToday(event.end)

		return state.events.filter(eventIsToday)
	}

	const handleCreateEvent = (event) => {
		event.id = uuid()
		// POST event to server
		// on success:
		const events = [...state.events, event]
		setState({ events })
		return true
	}

	const handleUpdateEvent = (update) => {
		const events = [...state.events]
		const eventIndex = events.findIndex(
			event => event.id === update.id
		)
		events[eventIndex] = update
		setState({ events })
		return true
	}

	const handleDeleteEvent = (deleted) => {
		const events = [...state.events]
		const eventIndex = events.findIndex(
			event => event.id === deleted.id
		)
		events.splice(eventIndex, eventIndex+1)
		setState({ events })
		return true
	}

	return (
		<Provider value={{
			...state,
			filterTodaysEvents,
			handleCreateEvent,
			handleUpdateEvent,
			handleDeleteEvent,
		}}>{props.children}</Provider>
	)
}


export { EventProvider, Consumer as EventConsumer }
export default EventContext
