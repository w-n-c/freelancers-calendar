import React from 'react'
import { useForm } from 'react-hook-form'


const EventForm = (props) => {
	const { register, handleSubmit, getValues } = useForm()

	const handleDelete = (e) => {
		e.preventDefault()
		const { eventId } = getValues()
		props.handleDelete(eventId)
	}

	const onSubmit = (data, e) => {
		e.preventDefault()
		data.id = props.eventId
		props.handleSubmit(data)
	}
		return (
			<section className="event-menu">
				<form onSubmit={handleSubmit(onSubmit)}>
					<legend className="aria-only">Event Information</legend>
					<label><span className="aria-only">Event Title</span>
						<input
							placeholder="Event Title"
							defaultValue={props.title}
							name="title"
							type="text"
							ref={register({ required: true })}
							autoFocus={true}
						/>
					</label>
					<fieldset className="event-start">
						<legend>Start</legend>
						<label className="event-date"><span className="aria-only">Start Date</span>
							<input
								defaultValue={props.startDate}
								type="date"
								name="startDate"
								ref={register({ required: true })}
							/>
						</label>
						<label className="event-time"><span className="aria-only">Start Time</span>
							<input
								defaultValue={props.startTime}
								type="time"
								name="startTime"
								ref={register({ required: true })}
							/>
						</label>
					</fieldset>
					<fieldset className="event-end">
						<legend>End</legend>
						<label className="end-date"><span className="aria-only">End Date</span>
							<input
								defaultValue={props.endDate}
								type="date"
								name="endDate"
								ref={register({ required: true })}
							/>
						</label>
						<label className="end-time"><span className="aria-only">End Time</span>
							<input
								defaultValue={props.endTime}
								type="time"
								name="endTime"
								ref={register({ required: true })}
							/>
						</label>
					</fieldset>
					<div className="event-description">
						<label><span className="aria-only">Description</span>
							<textarea
								placeholder="Description..."
								defaultValue={props.description}
								name="description"
								spellCheck="true"
								ref={register()}
							></textarea>
						</label>
					</div>
					<input type="submit" value="Save" />
					<input type="submit" value="Delete" onClick={handleDelete} />
				</form>
				<button className="close" aria-label="close" onClick={props.handleClose}>
					X
				</button>
			</section>
		)
}

export default EventForm
