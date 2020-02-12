import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import moment from 'moment'

const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/

yup.addMethod(yup.date, 'isChronological', function(){})
const EventSchema = yup.object({
	title: yup.string().required('title is required').max(200, 'Title cannot exceed ${max} characters in length'),
	startDate: yup.date().required(),
	endDate: yup.date().required(),
	startTime: yup.string().matches(timeRegex),
	endTime: yup.string().matches(timeRegex),
	description: yup.string().notRequired().max(1000, 'Description cannot exceed ${max} characters in length'),
}).test(
	'eventHasLength',
	'event start should occur before event end',
	({startDate, startTime, endDate, endTime}) => {
		const [sHour, sMin] = startTime.split(':')
		const [eHour, eMin] = endTime.split(':')
		const start = moment(startDate).hour(sHour).minute(sMin)
		const end = moment(endDate).hour(eHour).minute(eMin)
		return end.isAfter(start)
	}
)

const EventForm = (props) => {
	const { register, handleSubmit, getValues } = useForm({ validationSchema: EventSchema })

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
						ref={register()}
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
							ref={register()}
						/>
					</label>
					<label className="event-time"><span className="aria-only">Start Time</span>
						<input
							defaultValue={props.startTime}
							type="time"
							name="startTime"
							ref={register()}
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
							ref={register()}
						/>
					</label>
					<label className="end-time"><span className="aria-only">End Time</span>
						<input
							defaultValue={props.endTime}
							type="time"
							name="endTime"
							ref={register()}
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
