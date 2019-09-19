import React from 'react'
import { isoDateToTimeString } from '../utils'
import { isInHour, timeInHours } from './utils'

const sharedStyle = {
	position: 'absolute',
	background: 'lightblue',
	color: 'white',
	overflow: 'visible',
	margin: 0,
	padding: 0,
	zIndex: 1
}

const dateFromDay = day => {
	const date = new Date(`${day.year}/${day.month}/${day.date}`)
	if (day.hour)
		date.setHours(day.hour)
	return date
}

// should only be called if event Start occurs in this hour
const offset = (eventStart) =>
	1 - (60 - eventStart.getMinutes()) / 60

const getTop = (eventStart) =>
	`calc(${offset(eventStart)} * 100% - 2px)`

const calcHeight = (hourStart, eventTime) => {
	return isInHour(hourStart)(eventTime)
	? timeInHours(hourStart, eventTime)
	: 0
}

const getHeight = (hour, eventStart, eventEnd) => {
	const hasStartHeight = calcHeight(hour, eventStart) 
	const hasEndHeight = calcHeight(hour, eventEnd) 

	let height = 1

	if (hasStartHeight && hasEndHeight) {
		height -= hasStartHeight + hasEndHeight
	} else if (hasStartHeight) {
		height -= hasStartHeight
	} else if (hasEndHeight) {
		height -= 1 - hasEndHeight
	}

	return isInHour(hour, eventStart)
		? `calc(${height} * 100% + 2px)`
		: 0
}



export default ({events, now, handleClick}) =>
	<article role="gridcell" onClick={(e) => handleClick('new')}>
		{events.map((event, i) => {
			const thisHour = dateFromDay(now)
			const eventStart = new Date(event.start)
			const eventEnd = new Date(event.end)

			const startsInHour = isInHour(thisHour)(eventStart)

			const style = {...sharedStyle}
			style.top = startsInHour ? getTop(eventStart) : 0
			style.height = getHeight(thisHour, eventStart, eventEnd)

			const startTime = isoDateToTimeString(event.start)
			const endTime = isoDateToTimeString(event.end)

			const hourOf = (date) => date.getHours()

			return (
				<section
					style={style}
					key={i}
					onClick={(e) => {
						e.stopPropagation()
						handleClick(event.id)
					}}
				>
					<h4>{event.title}</h4>
					<p>{`${startTime} - ${endTime}`}</p>
				</section>
			)
		})}
	</article>
