import React from 'react'
import EventForm from './EventForm'
import { EventConsumer } from '../../EventContext'
import { isoDateToCalStrings } from '../utils'


export default (props) =>
	<EventConsumer>{({handleCreateEvent, handleUpdateEvent, handleDeleteEvent}) => {
		const handleSubmit = (event) => {
			// TODO: handlers should return promises
			const success = event.id
				? handleUpdateEvent(event)
				:	handleCreateEvent(event)
			props.handleFormSubmission(success)
		}

		const event = props.event
		const [startDate, startTime] = isoDateToCalStrings(event.start)
		const [endDate, endTime] = isoDateToCalStrings(event.end)

		const formInput = {
			eventTitle: event.title,
			startDate,
			startTime,
			endDate,
			endTime,
			description: event.description
		}

		return <EventForm {...formInput} handleSubmit={handleSubmit} />
	}}</EventConsumer>
