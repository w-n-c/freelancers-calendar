import React from 'react'
import { isoDateToTimeString, newEventQuery } from '../utils'
import { isInHour } from './utils'

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
	`calc(${1 - offset(new Date(start))} * 100% - 2px)`

const getBottom = (end) =>
	`calc(${offset(new Date(end))} * 100% + 2px)`

const offset = (start) =>
	(60 - start.getMinutes()) / 60

export default ({events, now, navLink}) =>
	<article role="gridcell" onClick={(e) => navLink(newEventQuery(now))}>
		{events.map((event, i) => {
			const inThisHour = isInHour(now)
			const startsInHour = inThisHour(event.start)
			const endsInHour = inThisHour(event.end)

			const style = {...sharedStyle}
			style.top = startsInHour ? getTop(event.start) : '-2px'
			style.bottom = endsInHour ? getBottom(event.end) : '0'
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
						navLink(event.id)
					}}
				>
					<h4>{event.title}</h4>
					<p>{`${startTime} - ${endTime}`}</p>
				</section>
			)
		})}
	</article>
