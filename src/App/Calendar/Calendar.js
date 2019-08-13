import React, { useState } from 'react'
import { Router } from '@reach/router'
import Monthly from './Monthly'
import Weekly from './Weekly'
import Event from './Event'
import ColumnHeader from './ColumnHeader'

// TODO: callback to weekly to add date info to each th
// TODO: toggle between weekday abbreviations and full name base on window width

export const weekdayAbbr = ['Su','Mo','Tu','We','Th','Fr','Sa']
export const weekdayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

export function Calendar(props) {
	const [formRendered, toggleForm] = useState(false)
	const [event, updateEvent] = useState({})

	const handleClick = (event) => {
		toggleForm(prevFormState => !prevFormState)
		updateEvent(event)
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

	const handleMouseMove = (e) => {
		e.preventDefault()
		props.handleUpdateToday()
	}


	// changing CSS display on table elements wipes their ARIA role
	// so we reapply those roles to various elements
	return <main onMouseMove={handleMouseMove} role="grid">
			{/*<caption>Month Year</caption>*/}
			<div role="rowgroup">
				<header role="row">
					{weekdayNames.map((name, i) => {
						return <ColumnHeader ariaHeader={name} visualHeader={weekdayAbbr[i]} key={i}/>
					})}
				</header>
			</div>
				<Router role="rowgroup">
					<Monthly path="monthly/:year/:month/:day" handleClick={handleClick}/>
					<Weekly path="weekly/:year/:month/:day" handleClick={handleClick}/>
				</Router>
		{formRendered ? renderForm() : '' }
	</main>
}
