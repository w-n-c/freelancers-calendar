import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import moment from 'moment'

const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/

yup.addMethod(yup.date, 'isChronological', function(){})
const EventSchema = yup.object({
	// eslint-disable-next-line
	title: yup.string().required('title is required').max(200, 'Title cannot exceed ${max} characters in length'),
	startDate: yup.date().required(),
	endDate: yup.date().required(),
	startTime: yup.string().matches(timeRegex, 'must be a valid time'),
	endTime: yup.string().matches(timeRegex, 'must be a valid time'),
	// eslint-disable-next-line
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
	const { register, handleSubmit, getValues, errors } = useForm({ validationSchema: EventSchema })

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
			<div>
				<button className="close" aria-label="close" onClick={props.handleClose}><svg
						viewBox="0 0 12 12"
						version="1.1" xmlns="http://www.w3.org/2000/svg"
					>
						<line x1="1" y1="11" 
									x2="11" y2="1" 
									stroke="black" 
									strokeWidth="2"/>
						<line x1="1" y1="1" 
									x2="11" y2="11" 
									stroke="black" 
									strokeWidth="2"/>
						</svg></button>
				<form onSubmit={handleSubmit(onSubmit)}>
					<legend className="aria-only">Event Information</legend>
					<label className="event-title"><span className="aria-only">Event Title</span>
						<input
							placeholder="Event Title"
							defaultValue={props.title}
							name="title"
							type="text"
							ref={register()}
							autoFocus={true}
						/>
					{errors.title && <span className="error">{errors.title.message}</span>}
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
						{errors.startDate && <span className="error">must have a valid date</span>}
						{errors.startTime && <span className="error">{errors.startTime.message}</span>}
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
						{errors.endDate && <span className="error">must have a valid date</span>}
						{errors.endTime && <span className="error">{errors.endTime.message}</span>}
					</fieldset>
					<div className="error">
						{errors.undefined && <span>{errors.undefined.message}</span>}
					</div>
					<div className="event-description">
						<label><span className="aria-only">Description</span>
							<textarea
								placeholder="Description..."
								defaultValue={props.description}
								name="description"
								spellCheck="true"
								ref={register()}
							></textarea>
							{errors.description && <span className="error">{errors.description.message}</span>}
						</label>
					</div>
					<div className="form-submit">
						<input className="save" type="submit" value="Save" />
						<input className="delete" type="submit" value="Delete" onClick={handleDelete} />
					</div>
				</form>
			</div>
		</section>
	)
}

export default EventForm
