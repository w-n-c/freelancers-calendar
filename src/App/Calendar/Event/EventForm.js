import React, { useState, useEffect, useCallback } from 'react'

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
					<legend>Input Event Information</legend>
					<div className="event-title">
						<label htmlFor="event-title">Event Title</label>
						<input
							autoFocus={true}
							name="eventTitle"
							type="text"
							id="event-title"
							onChange={handleChange}
							value={state.eventTitle}
						/>
					</div>
					<div className="event-start">
						<label htmlFor="start-date">Start Date</label>
						<input
							name="startDate"
							type="text"
							id="start-date"
							onChange={handleChange}
							value={state.startDate}
						/>
						<label htmlFor="start-time">Start Time</label>
						<input
							name="startTime"
							type="text"
							id="start-time"
							onChange={handleChange}
							value={state.startTime}
						/>
					</div>
					<div className="event-end">
						<label htmlFor="end-date">End Date</label>
						<input
							name="endDate"
							type="text"
							id="end-date"
							onChange={handleChange}
							value={state.endDate}
						/>
						<label htmlFor="end-time">End Time</label>
						<input
							name="endTime"
							type="text"
							id="end-time"
							onChange={handleChange}
							value={state.endTime}
						/>
					</div>
					<div className="event-description">
						<label htmlFor="description">Description</label>
						<textarea
							name="description"
							id="description"
							onChange={handleChange}
							value={state.description}
							rows="3"
							cols="90"
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
