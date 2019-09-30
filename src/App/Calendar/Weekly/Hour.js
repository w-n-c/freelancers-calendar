import React from 'react'
import { isoDateToTimeString } from '../utils'
import { isInHour, lengthInHours } from './utils'

const sharedStyle = {
	position: 'absolute',
	background: 'lightblue',
	color: 'lightblue',
	overflow: 'hidden',
	margin: 0,
	padding: 0,
	zIndex: 1,
}

const getTop = (start) =>
	`calc(${offset(new Date(start))} * 100% - 2px)`

const offset = (start) =>
	1 - (60 - start.getMinutes()) / 60

const calcHeight = (hour, event) => {
	const height = lengthInHours(hour, event)
	return height >= 0.10 ? height : 0
}

const getHeight = (hour, eventStart, eventEnd) => {
	const startHeight = calcHeight(hour, eventStart)
	const endHeight = calcHeight(hour, eventEnd)

	let height = 0
	height += isInHour(hour)(eventStart) ? 1 - startHeight : 0
	height += isInHour(hour)(eventEnd) ? endHeight : 0

	return isInHour(hour, eventStart)
		? `calc(${height} * 100% + 2px)`
		: 0
}



export default ({events, now, handleClick}) =>
	<article role="gridcell" onClick={(e) => handleClick('new')}>
		{events.map((event, i) => {
			const inThisHour = isInHour(now)
			const startsInHour = inThisHour(event.start)

			const style = {...sharedStyle}
			style.top = startsInHour ? getTop(event.start) : '-2px'
			style.height = getHeight(now, event.start, event.end)
			if (startsInHour) style.zIndex = 2

			const showText = startsInHour || now.getHours() === 0
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
