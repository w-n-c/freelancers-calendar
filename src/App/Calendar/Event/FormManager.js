import React, { useContext, useState, useEffect } from 'react'
import EventForm from './EventForm'
import EventContext from '../../EventContext'
import { isoDateToCalStrings } from '../utils'

export default ({event, onClose}) => {
	const { handleCreateEvent, handleUpdateEvent, handleDeleteEvent } = useContext(EventContext)
	const [shouldDelete, deleteEvent] = useState(false)

	useEffect(() => () => {if (shouldDelete) handleDeleteEvent(event.id)})

	const handleSubmit = (event) => {
		const success = event.id ? handleUpdateEvent(event) : handleCreateEvent(event)
		// Need to create an error handling system
		// placeholders as reminder
		if (success) {
			handleClose()
		}
	}

	const handleDelete = (id) => {
		deleteEvent(true)
		handleClose()
	}

	const handleClose = onClose

	const [startDate, startTime] = isoDateToCalStrings(event.start)
	const [endDate, endTime] = isoDateToCalStrings(event.end)

	const formState = {
		eventId: event.id,
		eventTitle: event.title,
		startDate,
		startTime,
		endDate,
		endTime,
		description: event.description,
		handleSubmit,
		handleDelete,
		handleClose,
	}
	return <EventForm {...formState}/>
}
