import React from 'react'

export default class EventForm extends React.Component {
	/* Normally an anti-pattern, but in this case I believe it makes
	 * sense to use props as initialState. This form is used to create/update
	 * an event, so the event data (passed as props) will not change
	 * within the lifetime of this component.
	*/
	state = {
		eventTitle: this.props.eventTitle || "",
		description: this.props.description || "",
		startDate: this.props.startDate || "",
		startTime: this.props.startTime || "",
		endTime: this.props.endTime || "",
		endDate: this.props.endDate || ""
	}

	handleChange = (event) => {
		const name = event.target.name
		const value = event.target.value
		this.setState({[name]: value})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.handleSubmit(this.createEvent())
	}

	createEvent = () => {
		const event = {}
		event.title = this.state.eventTitle
		event.description = this.state.description
		event.start = this.parseDateInput(this.state.startDate, this.state.startTime)
		event.end = this.parseDateInput(this.state.endDate, this.state.endTime)
		return event
	}

	parseDateInput(inputDate, inputTime) {
		const date = new Date(inputDate)
		const time = inputTime.split(':')
		date.setHours(time[0])
		date.setMinutes(time[1])
		return date.toISOString()
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
						value={this.state.eventTitle}
					/>
				</div>
				<div>
					<label htmlFor="start-date">Start Date</label>
					<input
						name="startDate"
						type="text"
						id="start-date"
						onChange={this.handleChange}
						value={this.state.startDate}
					/>
					<label htmlFor="start-time">Start Time</label>
					<input
						name="startTime"
						type="text"
						id="start-time"
						onChange={this.handleChange}
						value={this.state.startTime}
					/>
				</div>
				<div>
					<label htmlFor="end-date">End Date</label>
					<input
						name="endDate"
						type="text"
						id="end-date"
						onChange={this.handleChange}
						value={this.state.endDate}
					/>
					<label htmlFor="end-time">End Time</label>
					<input
						name="endTime"
						type="text"
						id="end-time"
						onChange={this.handleChange}
						value={this.state.endTime}
					/>
				</div>
				<div>
					<label htmlFor="description">Description</label>
					<textarea
						name="description"
						id="description"
						onChange={this.handleChange}
						value={this.state.description}
					></textarea>
				</div>
				<button type="submit" onClick={this.handleSubmit}>Save</button>
			</form>
		)
	}
}
