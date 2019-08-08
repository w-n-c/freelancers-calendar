import React from 'react'
import { isoDateToTimeString } from '../utils'
import { lengthInHours } from './utils'

const newEvent = ({year, month, day, hour}) => {
	const event = {}
	const date = new Date(`${year}/${month}/${day}`)
	date.setHours(hour)
	event.start = date.toISOString()
	date.setHours(hour+1)
	event.end = date.toISOString()
	return event
}

export default ({date, events, handleClick}) => {
	const style = {
		position: 'relative',
		background: 'lightblue',
		color: 'white'
	}
	return <article role="gridcell" onClick={e => handleClick(newEvent(date))}>
		{events.map((event, i) => {
			const offset = new Date(event.start).getMinutes()/60
			const length = lengthInHours(event.start, event.end)

			style.top = `calc(${offset}*3rem)`
			style.height = `calc(${length}*3rem`

			const startTime = isoDateToTimeString(event.start)
			const endTime = isoDateToTimeString(event.end)
			return (
				<section
					onClick={e => {e.stopPropagation(); handleClick(event)}}
					style={style}
					key={i}
				>
					<h4>{event.title}</h4>
					<br />
					<p>{`${startTime} - ${endTime}`}</p>
				</section>
			)
		})}
	</article>
}
