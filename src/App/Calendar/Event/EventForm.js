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
					<legend>Event Information</legend>
					<label>Event Title
						<input
							defaultValue={props.title}
							name="title"
							type="text"
							ref={register({ required: true })}
							autoFocus={true}
						/>
					</label>
					<div className="event-start">
						<label className="event-date">Start Date
							<input
								defaultValue={props.startDate}
								type="date"
								name="startDate"
								ref={register({ required: true })}
							/>
						</label>
						<label className="event-time">Start Time
							<input
								defaultValue={props.startTime}
								type="time"
								name="startTime"
								ref={register({ required: true })}
							/>
						</label>
					</div>
					<div className="event-end">
						<label className="end-date">End Date
							<input
								defaultValue={props.endDate}
								type="date"
								name="endDate"
								ref={register({ required: true })}
							/>
						</label>
						<label className="end-time">End Time
							<input
								defaultValue={props.endTime}
								type="time"
								name="endTime"
								ref={register({ required: true })}
							/>
						</label>
					</div>
					<div className="event-description">
						<label>Description
							<textarea
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
