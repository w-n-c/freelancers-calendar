import React, { useContext } from 'react'
import EventForm from './EventForm'
import EventContext from '../../EventContext'
import { isoDateToCalStrings } from '../utils'

const newEvent = (year, month, date) => ({
	start: new Date(`${year}/${month}/${date}`).toISOString(),
	end: new Date().toISOString()
})

export default (props) => {
	const {getEvent, handleCreateEvent, handleUpdateEvent, handleDeleteEvent} = useContext(EventContext)


	const handleSubmit = (event) => {
		const success = event.id
			? handleUpdateEvent(event)
			: handleCreateEvent(event)
		if (success) {
			const { route, year, month, date } = props
			props.navigate(`/${route}/${year}/${month}/${date}`)
		}
	}

	let event = {} 
	if (props.id === 'new') {
		event = newEvent(props.year, props.month, props.date)
	} else {
		event = getEvent(props.id)
	}

	const [startDate, startTime] = isoDateToCalStrings(event.start)
	const [endDate, endTime] = isoDateToCalStrings(event.end)

	const formInput = {
		eventId: event.id,
		eventTitle: event.title,
		startDate,
		startTime,
		endDate,
		endTime,
		description: event.description
	}

	return <EventForm {...formInput} handleDelete={handleDeleteEvent} handleSubmit={handleSubmit} />
}
