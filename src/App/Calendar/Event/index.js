import React from 'react'
import EventForm from './EventForm'
import { EventConsumer } from '../../EventContext'

export const putEvent = (event, date) => {}

export const moveEvent = (event, date) => {}
export const updateEvent = (event, date) => {}
export const newEvent = (event, date) => {}

// calling with an event opens a menu to update the event
// calling with a date opens a menu to create a new event at that date
// calling with both moves the start time of the event to the new date

export default (props) => <EventForm />
