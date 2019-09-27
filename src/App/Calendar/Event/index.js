import React, { useContext } from 'react'
import EventForm from './EventForm'
import EventContext from '../../EventContext'
import { isoDateToCalStrings } from '../utils'

const newEvent = (year, month, date) => ({
	start: new Date(`${year}/${month}/${date}`).toISOString(),
	end: new Date(`${year}/${month}/${date}`).toISOString()
})

export default (props) => {
	const {getEvent, handleCreateEvent, handleUpdateEvent, handleDeleteEvent} = useContext(EventContext)
	const { route, year, month, date, id } = props

	const handleDelete = (id) => {
		// temporary workaround to the fact the component is deleting itself
		// gives time for the async navigation/rerender to occur
		window.setTimeout(handleDeleteEvent, 100, id)
		props.navigate(`/${route}/${year}/${month}/${date}`)
	}
	const handleSubmit = (event) => {
		const success = event.id ? handleUpdateEvent(event) : handleCreateEvent(event)
		// Need to create an error handling system
		// placeholders as reminder
		if (success) {
			props.navigate(`/${route}/${year}/${month}/${date}`)
		}
	}

	const handleClose = () => props.navigate(`/${route}/${year}/${month}/${date}`)

	let event = {}
	if (id === 'new') {
		event = newEvent(year, month, date)
	} else {
		event = getEvent(id)
	}

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
