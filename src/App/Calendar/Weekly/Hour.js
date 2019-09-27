import React from 'react'
import { isoDateToTimeString } from '../utils'
import { isInHour, timeInHours } from './utils'

const sharedStyle = {
	position: 'absolute',
	background: 'lightblue',
	color: 'lightblue',
	overflow: 'hidden',
	margin: 0,
	padding: 0,
	zIndex: 1,
}

const dateFromDay = ({year, month, date, hour}) => {
	const dateObj = new Date(`${year}/${month}/${date}`)
	if (hour)
		dateObj.setHours(hour)
	return dateObj
}

// should only be called if event Start occurs in this hour
const getTop = (start) =>
	`calc(${offset(new Date(start))} * 100% - 2px)`

const offset = (start) =>
	1 - (60 - start.getMinutes()) / 60

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
			const inThisHour = isInHour(thisHour)
			const startsInHour = inThisHour(event.start)
			const endsInHour = inThisHour(event.end)

			const style = {...sharedStyle}
			style.top = startsInHour ? getTop(event.start) : 0
			style.height = getHeight(thisHour, event.start, event.end)
			if (startsInHour) style.zIndex = 2

			const showText = startsInHour || thisHour.getHours() === 0
			if (showText) {
				style.color = 'white'
				style.overflow = 'visible'
			}

			const startTime = isoDateToTimeString(event.start)
			const endTime = isoDateToTimeString(event.end)

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
