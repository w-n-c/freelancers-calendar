import React, { useContext } from 'react'
import useApi from './useApi'
import eventApiFactory from './eventApiFactory'
import db from './eventDbApi'
import server from './eventServerApi'
import { omit } from 'lodash'
import UserContext from '../UserContext'

const EventContext = React.createContext()
const { Provider, Consumer } = EventContext

const EventProvider = (props) => {
	const { isLoggedIn } = useContext(UserContext)
	const eventState = useApi(eventApiFactory, {
		events: [],
		loading: false,
		error: ''
	})

	const checkEvents = async () => {
		let events = []
		try {
			if (isLoggedIn) {
				const localEventsCollection = await db.localEvents()
				const localEvents = await localEventsCollection.toArray()
				if (localEvents.length) {
					await server.createMany(localEvents)
					await localEventsCollection.delete()
				}
				events = await server.get()
				await db.bulkAdd(events)
			} else {
				await db.events.filter((event) => typeof event.id !== 'number').delete()
				events = await db.events.toArray()
			}
			eventState.setMany(events)
		} catch (error) {
			console.log('Failed to sync events:\n', error.message || error)
			return false
		}
	}

	const handleCreateEvent = async (eventRequest) => {
		let event, id = false
		try {
			id = await db.events.add(omit(eventRequest, 'id'))
			if (isLoggedIn) {
				event = await server.create(eventRequest)
				await db.transaction('rw', db.events, async () => {
					await db.events.delete(id)
					await db.events.add(event)
				})
			}
			return true
		} catch (error) {
			console.log('Failed to create event:\n', error)
			return false
		} finally {
			if (!event && id) {
				event = Object.assign({}, eventRequest, { id })
			}
			eventState.create(event)
		}
	}

	const handleUpdateEvent = async (update) => {
		let isUpdated = false
		try {
			if (isLoggedIn) {
				isUpdated = await server.update(update)
			}
			await db.events.update(update.id, omit(update, 'id'))
			eventState.update(isUpdated)
			return isUpdated
		} catch (error) {
			console.log('Failed to update event:\n', error)
			return false
		}
	}

	const handleDeleteEvent = async (deletionId) => {
		if (!deletionId) return false
		try {
			if (isLoggedIn) {
				await server.delete(deletionId)
			}
			await db.events.delete(deletionId)
			eventState.delete(deletionId)
			return true
		} catch( error) {
			console.log('Failed to delete event:\n', error)
			return false
		}
	}

	return (
		<Provider value={{
			getEvent: eventState.findById,
			checkEvents,
			filterTodaysEvents: eventState.findInDay,
			handleCreateEvent,
			handleUpdateEvent,
			handleDeleteEvent,
		}}>{props.children}</Provider>
	)
}

export { EventProvider, Consumer as EventConsumer }
export default EventContext
