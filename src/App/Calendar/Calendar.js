import React, { useState } from 'react'
import Event from './Event'
import ColumnHeader from './ColumnHeader'

// TODO: callback to weekly to add date info to each th
// TODO: toggle between weekday abbreviations and full name base on window width

export const weekdayAbbr = ['Su','Mo','Tu','We','Th','Fr','Sa']
export const weekdayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

export function Calendar({handleUpdateToday, view, render, year, month, day}) {
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

	const renderForm = () =>
	 <Event
			event={event}
			handleFormSubmission={handleFormSubmission}
		/>

		return (
			<main onMouseMove={handleMouseMove} role="grid">
				<div role="rowgroup">
					<header role="row">
						{weekdayNames.map((name, i) => {
							return <ColumnHeader ariaHeader={name} visualHeader={weekdayAbbr[i]} key={i}/>
						})}
					</header>
				</div>
				<div className={view} role="rowgroup">
					{render({year, month, day, handleClick})}
				</div>
				{formRendered ? renderForm() : '' }
			</main>
		)
}
