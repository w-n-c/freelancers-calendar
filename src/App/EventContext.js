import React, { useState } from 'react'
import { assign } from 'lodash'
const events = require('./events.json')
const uuid = require('nanoid')

const EventContext = React.createContext()
const { Provider, Consumer } = EventContext

const EventProvider = (props) => {
	const [state, newState] = useState({
		events,
		loading: false,
		error: ''
	})

	const setState = assign(newState)

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

	// TODO: handlers should return promises
	const createEvent = (event) => {
		event.id = uuid()
		// POST event to server
		// on success:
		const events = [...state.events, event]
		setState({ events: events })
		return true
	}

	const updateEvent = (update) => {
		const events = [...state.events]
		const eventIndex = events.findIndex(
			event => event.id === update.id
		)
		events[eventIndex] = update
		setState({ events })
		return true
	}

	const deleteEvent = (deleted) => {
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
			filterTodaysEvents: filterTodaysEvents,
			handleCreateEvent: createEvent,
			handleUpdateEvent: updateEvent,
			handleDeleteEvent: deleteEvent,
		}}>{props.children}</Provider>
	)
}


export { EventProvider, Consumer as EventConsumer }
export default EventContext
