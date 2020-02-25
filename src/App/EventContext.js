import React, { useState } from 'react'
import { isEqual } from 'lodash'
import axios from 'axios'

const EventContext = React.createContext()
const { Provider, Consumer } = EventContext

const EventProvider = (props) => {
	const [state, updateState] = useState({
		events: [],
		loading: false,
		error: ''
	})

	const setState = (state) => updateState(oldState => ({...oldState, ...state}))

	const getEvent = (id) => state.events.find(event => event.id === id)

	const filterTodaysEvents = ({year, month, date}) => {

		const isInDay = day => date => {
			const dayStart = new Date(day)
			const dayEnd = new Date(dayStart)
			dayEnd.setHours(24)
			const time = new Date(date)

			return time >= dayStart && time < dayEnd
		}

		const isInEvent = day => event =>
			(new Date(event.start) < day && day < new Date(event.end))

		const today = new Date(`${year}/${month}/${date}`)
		const isToday = isInDay(today)
		const todayInEvent = isInEvent(today)

		const eventIsToday = event =>
			isToday(event.start) || isToday(event.end) || todayInEvent(event)

		return state.events.filter(eventIsToday)
	}

	const checkEvents = async () => {
		try {
			const events = (await axios.get('/api/events/')).data
			if (!isEqual(events, state.events)) {
				setState({ events })
			}
		} catch (error) {
			console.log(error)
			return false
		}
	}

	const handleCreateEvent = async (event) => {
		try {
			const savedEvent = (await axios.post('/api/events/new', event)).data
			const events = [...state.events, savedEvent]
			setState({ events })
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	}

	const handleUpdateEvent = async (update) => {
		try {
			const isUpdated = (await axios.post(`/api/events/${update.id}`, update)).data

			const events = [...state.events]
			const eventIndex = events.findIndex(event => event.id === update.id)
			events[eventIndex] = update
			setState({ events })

			return isUpdated
		} catch (error) {
			console.log(error)
			return false
		}
	}

	const handleDeleteEvent = async (deletionId) => {
		try {
			await axios.delete(`/api/events/${deletionId}`)
			const events = [...state.events]
			const eventIndex = events.findIndex(
				event => event.id === deletionId
			)
			events.splice(eventIndex, 1)
			setState({ events })
			return true
		} catch( error) {
			console.log(error)
			return false
		}
	}

	return (
		<Provider value={{
			getEvent,
			checkEvents,
			filterTodaysEvents,
			handleCreateEvent,
			handleUpdateEvent,
			handleDeleteEvent,
		}}>{props.children}</Provider>
	)
}


export { EventProvider, Consumer as EventConsumer }
export default EventContext
