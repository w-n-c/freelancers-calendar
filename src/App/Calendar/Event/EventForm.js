import React, { useState, useEffect, useCallback } from 'react'
import FormInput from './FormInput'

const titleCase = (input) => {
	const string = input.replace(/([A-Z])/g, " $1")
	return string.charAt(0).toUpperCase() + string.slice(1)
}

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
	// property keys should be the same as keys in state, see hasError()
	const [errors, updateErrors] = useState({
		eventTitle: "",
		startDate: "",
		startTime: "",
		endTime: "",
		endDate: "",
	})

	const stateUpdater = (state) => updateState(oldState => ({...oldState, ...state}))
	const setState = useCallback(stateUpdater, [])
	useEffect(() => setState(props), [props, setState, errors])

	const addErrors = (errors) => updateErrors(oldErrors => ({...oldErrors, ...errors}))

	const handleChange = (event) => {
		const name = event.target.name
		const value = event.target.value
		setState({[name]: value})
	}

	const dateThatsFirst = () => {
		const start = new Date(state.startDate) 
		const end = new Date(state.endDate) 
		if (start < end) {
			return 'start'
		} else if (start === end) {
			return 'equal'
		} else {
			return 'end'
		}
	}

	const hasError = () => {
		const localErrors = {}
		let hasError = false
		for (const prop in errors) {
			if (!state[prop]) {
				localErrors[prop] = `${titleCase(prop)} is Required!`
				hasError = true
			}
		}
		if (dateThatsFirst() === 'end') {
			const error = 'Start Date must occur before End Date'
			localErrors.startDate = error
			localErrors.endDate = ' '
			hasError = true
		} else if (dateThatsFirst() === 'equal') {
			if (
				parseDateInput(state.startDate, state.startTime)
				>= parseDateInput(state.endDate, state.endTime)
			) {
				const error = 'Start Time should be after End Time for one day events'
				localErrors.startTime = error
				localErrors.endTime = ' '
				hasError = true
			}
		}
		addErrors(localErrors)
		return hasError
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!hasError()) props.handleSubmit(createEvent())
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
						type="text"
						autoFocus={true}
						label="Event Title"
						value={state.eventTitle}
						handler={handleChange}
						error={errors.eventTitle}
					/>
					<div className="event-start">
						<FormInput
							type="date"
							label="Start Date"
							wrapper="event-date"
							value={state.startDate}
							handler={handleChange}
							error={errors.startDate}
						/>
						<FormInput
							type="time"
							label="Start Time"
							wrapperClass="event-time"
							value={state.startTime}
							handler={handleChange}
							error={errors.startTime}
						/>
					</div>
					<div className="event-end">
						<FormInput
							type="date"
							label="End Date"
							wrapper="event-date"
							value={state.endDate}
							handler={handleChange}
							error={errors.endDate}
						/>
						<FormInput
							type="time"
							label="End Time"
							wrapperClass="event-time"
							value={state.endTime}
							handler={handleChange}
							error={errors.endTime}
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
