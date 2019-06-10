import React from 'react'
import EventForm from './EventForm'
import { EventConsumer } from '../../EventContext'
import { toDateString, toTimeString } from '../utils'


export default (props) =>
	<EventConsumer>{({handleCreateEvent, handleUpdateEvent, handleDeleteEvent}) => {
		const handleSubmit = (event) => {
			// TODO: handlers should return promises
			const success = event.id
				? handleUpdateEvent(event)
				:	handleCreateEvent(event)
			props.handleFormSubmission(success)
		}

		const event = props.event || {}
		const date = props.date || {}

		const start = new Date(event.start)
		const startDate = toDateString(start) || toDateString(date)
		const startTime = toTimeString(start) || toTimeString(date)

		const end = new Date(event.end)
		const endDate = toDateString(end) || toDateString(date)
		const endTime = toTimeString(end)

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
