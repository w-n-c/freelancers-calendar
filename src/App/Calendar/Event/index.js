import React, { useContext } from 'react'
import EventForm from './EventForm'
import EventContext from '../../EventContext'
import { isoDateToCalStrings } from '../utils'

export default ({event}) => {
	const {handleCreateEvent, handleUpdateEvent, handleDeleteEvent} = useContext(EventContext)

	const handleSubmit = (event) => {
		const success = event.id
			? handleUpdateEvent(event)
			: handleCreateEvent(event)
		props.handleFormSubmission(success)
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

	return <EventForm {...formInput} handleSubmit={handleSubmit} />
}
