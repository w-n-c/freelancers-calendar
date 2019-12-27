import React, { useState, useEffect, useCallback } from 'react'
import FormInput from './FormInput'

const EventForm = (props) => {
	const [state, updateState] = useState({
		eventId: "",
		eventTitle: "",
		description: "",
		startDate: "",
		startTime: "",
		endTime: "",
		endDate: ""
	})

	const stateUpdater = (state) => updateState(oldState => ({...oldState, ...state}))
	const setState = useCallback(stateUpdater, [])
	useEffect(() => setState(props), [props, setState])

	const handleChange = (event) => {
		const name = event.target.name
		const value = event.target.value
		setState({[name]: value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		props.handleSubmit(createEvent())
	}

	const handleDelete = (e) => {
		e.preventDefault()
		props.handleDelete(state.eventId)
	}

	const createEvent = () => {
		const event = {}
		event.id = state.eventId
		event.title = state.eventTitle
		event.description = state.description
		event.start = parseDateInput(state.startDate, state.startTime)
		event.end = parseDateInput(state.endDate, state.endTime)
		return event
	}

	const parseDateInput = (inputDate, inputTime) => {
		const date = new Date(inputDate)
		const time = inputTime.split(':')
		date.setHours(time[0])
		date.setMinutes(time[1])
		return date.toISOString()
	}

		return (
			<section className="event-menu">
				<form onSubmit={handleSubmit}>
					<legend>Event Information</legend>
					<FormInput
						autoFocus={true}
						label="Event Title"
						value={state.eventTitle}
						handler={handleChange}
					/>
					<div className="event-start">
						<FormInput
							label="Start Date"
							wrapper="event-date"
							value={state.startDate}
							handler={handleChange}
						/>
						<FormInput
							label="Start Time"
							wrapperClass="event-time"
							value={state.startTime}
							handler={handleChange}
						/>
					</div>
					<div className="event-end">
						<FormInput
							label="End Date"
							wrapper="event-date"
							value={state.endDate}
							handler={handleChange}
						/>
						<FormInput
							label="End Time"
							wrapperClass="event-time"
							value={state.endTime}
							handler={handleChange}
						/>
					</div>
					<div className="event-description">
						<label htmlFor="description">Description</label>
						<textarea
							name="description"
							id="description"
							onChange={handleChange}
							value={state.description}
							spellCheck="true"
						></textarea>
					</div>
					<button type="submit" onClick={handleSubmit}>Save</button>
					<button type="submit" onClick={handleDelete}>Delete</button>
				</form>
				<button className="close" aria-label="close" onClick={props.handleClose}>X</button>
			</section>
		)
}

export default EventForm
