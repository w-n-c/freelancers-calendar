import React from 'react'

export const putEvent(event, date) {}

export const moveEvent(event, date) {}
export const updateEvent(event, date) {}
export const newEvent(event, date) {}

// calling with an event opens a menu to update the event
// calling with a date opens a menu to create a new event at that date
// calling with both moves the start time of the event to the new date
export default ({event, date}) => {
	if (event && date) {
		return moveEvent(event, date)
	} else if (event) {
		return updateEvent(event)
	} else if (date) {
		return newEvent(date)
	} else {
		console.log(`Err in Event UI, received: ${event}, ${date}`)
		return ''
	}
}
