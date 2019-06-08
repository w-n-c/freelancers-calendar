import React from 'react'

export const putEvent = (event, date) => {}

export const moveEvent = (event, date) => {}
export const updateEvent = (event, date) => {}
export const newEvent = (event, date) => {}

// calling with an event opens a menu to update the event
// calling with a date opens a menu to create a new event at that date
// calling with both moves the start time of the event to the new date
export default class EventForm extends React.Component {
	state = {
		eventTitle: "",
		startDate: "",
		startTime: "",
		endTime: "",
		endDate: "",
		description: ""
	}

	handleChange = (event) => {
		const name = event.target.name
		const value = event.target.value
		this.setState({[name]: value})
		console.log(this.state)
	}

	handleSubmit = (event) => {
		event.preventDefault()
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<legend>Input Event Information</legend>
				<div>
					<label htmlFor="event-title">Event Title</label>
					<input
						name="eventTitle"
						type="text"
						id="event-title"
						onChange={this.handleChange}
					/>
				</div>
				<div>
					<label htmlFor="start-date">Start Date</label>
					<input
						name="startDate"
						type="text"
						id="start-date"
						onChange={this.handleChange}
					/>
					<label htmlFor="start-time">Start Time</label>
					<input
						name="startTime"
						type="text"
						id="start-time"
						onChange={this.handleChange}
					/>
				</div>
				<div>
					<label htmlFor="end-date">End Date</label>
					<input
						name="endDate"
						type="text"
						id="end-date"
						onChange={this.handleChange}
					/>
					<label htmlFor="end-time">End Time</label>
					<input
						name="endTime"
						type="text"
						id="end-time"
						onChange={this.handleChange}
					/>
				</div>
				<div>
					<label htmlFor="description">Description</label>
					<textarea
						name="description"
						id="description"
						onChange={this.handleChange}
					></textarea>
				</div>
				<button type="submit">Save</button>
			</form>
		)
	}
}
