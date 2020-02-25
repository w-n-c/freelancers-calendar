import React, { useContext, useState, useEffect } from 'react'
import EventForm from './EventForm'
import EventContext from '../../EventContext'
import { isoDateToCalStrings, padIfLenOne } from '../utils'

const toHyphenated = (date) => date.split('/').map(padIfLenOne).join('-')

const parseDateInput = (inputDate, inputTime) => {
	const date = new Date(inputDate)
	const time = inputTime.split(':')
	date.setHours(time[0])
	date.setMinutes(time[1])
	return date.toISOString()
}

const eventFromFormState = (state) => {
	const { id, title, description, startDate, startTime, endDate, endTime } = state
	return {
		id,
		title,
		description,
		start: parseDateInput(startDate, startTime),
		end: parseDateInput(endDate, endTime),
	}
}

export default ({event, onClose}) => {
	const { handleCreateEvent, handleUpdateEvent, handleDeleteEvent } = useContext(EventContext)
	const [shouldDelete, deleteEvent] = useState(false)

	useEffect(() => () => {if (shouldDelete) handleDeleteEvent(event.id)})

	const handleSubmit = (formState) => {
		const event = eventFromFormState(formState)
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
		title: event.title,
		startDate: toHyphenated(startDate),
		startTime,
		endDate: toHyphenated(endDate),
		endTime,
		description: event.description,
		handleSubmit,
		handleDelete,
		handleClose,
	}
	return <EventForm {...formState}/>
}
