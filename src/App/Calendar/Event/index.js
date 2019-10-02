import React, { useContext, useState, useEffect } from 'react'
import EventForm from './EventForm'
import EventContext from '../../EventContext'
import { isoDateToCalStrings } from '../utils'

const newEvent = (year, month, date) => ({
	start: new Date(`${year}/${month}/${date}`).toISOString(),
	end: new Date(`${year}/${month}/${date}`).toISOString()
})


export default (props) => {
	const { getEvent, handleCreateEvent, handleUpdateEvent, handleDeleteEvent } = useContext(EventContext)
	const { route, year, month, date, id } = props

	const [eventToDelete, setDeletion] = useState(false)
	useEffect(() => () => {if (eventToDelete) handleDeleteEvent(eventToDelete)})

	const closeForm = () => props.navigate(`/${route}/${year}/${month}/${date}`)

	const handleSubmit = (event) => {
		const success = event.id ? handleUpdateEvent(event) : handleCreateEvent(event)
		// Need to create an error handling system
		// placeholders as reminder
		if (success) {
			closeForm()
		}
	}

	const handleDelete = (id) => {
		setDeletion(id)
		closeForm()
	}

	const handleClose = closeForm

	const event = (id === 'new') ? newEvent(year, month, date) : getEvent(id)
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
