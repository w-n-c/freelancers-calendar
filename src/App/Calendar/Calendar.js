import React, { useState } from 'react'
import { pick } from 'lodash/fp'
import Event from './Event'
import CalendarHeader from './CalendarHeader'

export function Calendar(props) {

	const day = pick(['year', 'month', 'date'], props)
	const { handleUpdateToday, render } = props

	const [formRendered, toggleForm] = useState(false)
	const [event, updateEvent] = useState({})

	const handleClick = (event) => {
		toggleForm(prevFormState => !prevFormState)
		updateEvent(event)
	}

	const handleMouseMove = (e) => {
		e.preventDefault()
		handleUpdateToday()
	}

	// eventually Event will process a promise and return
	// a different result depending on submission success
	const handleFormSubmission = (success) => {
		toggleForm(!success)
		updateEvent({})
	}

	// Only the weekly view adds dates to the Calendar's column header
	const showDates = (props.view === 'weekly')

	return (
		<main onMouseMove={handleMouseMove} role="grid">
			<CalendarHeader day={showDates ? day : undefined} />
			{render(day, handleClick)}
			{formRendered ?
				<Event
					event={event}
					handleFormSubmission={handleFormSubmission}
				/> :
				null
			}
		</main>
	)
}
