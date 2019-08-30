import React, { useState } from 'react'
import { pick } from 'lodash/fp'
import Event from './Event'
import CalendarHeader from './CalendarHeader'

// TODO: callback to weekly to add date info to each th
// TODO: toggle between weekday abbreviations and full name base on window width


export function Calendar(props) {

	const day = pick(['year', 'month', 'date'], props)
	const { handleUpdateToday, render, view } = props

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

	return (
		<main onMouseMove={handleMouseMove} role="grid">
			<CalendarHeader day={view === 'weekly' ? day : undefined} />
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
