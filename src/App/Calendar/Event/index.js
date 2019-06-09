import React from 'react'
import EventForm from './EventForm'
import { EventConsumer } from '../../EventContext'
import { toDateString, toTimeString } from '../utils'

export const putEvent = (event, date) => {}

export const moveEvent = (event, date) => {}
export const updateEvent = (event, date) => {}
export const newEvent = (event, date) => {}

// calling with an event opens a menu to update the event
// calling with a date opens a menu to create a new event at that date
// calling with both moves the start time of the event to the new date

export default (props) =>
	<EventConsumer>{({handleCreateEvent, handleUpdateEvent}) => {
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

		return <EventForm {...formInput} />
	}}</EventConsumer>
