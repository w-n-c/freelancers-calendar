import React from 'react'

export default class EventForm extends React.Component {
	/* Normally an anti-pattern, but in this case I believe it makes
	 * sense to use props as initialState. This form is used to create/update
	 * an event, so the event data (passed as props) will not change
	 * within the lifetime of this component.
	*/
	state = {
		eventTitle: this.props.eventTitle || "",
		startDate: this.props.startDate || "",
		startTime: this.props.startTime || "",
		endTime: this.props.endTime || "",
		endDate: this.props.endDate || "",
		description: this.props.description || ""
	}

	handleChange = (event) => {
		const name = event.target.name
		const value = event.target.value
		this.setState({[name]: value})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.submitEvent(this.state)
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
