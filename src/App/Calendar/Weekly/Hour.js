import React from 'react'
import { isoDateToTimeString } from '../utils'
import { lengthInHours } from './utils'

const newEvent = ({year, month, date, hour}) => {
	const event = {}
	const day = new Date(`${year}/${month}/${date}`)
	day.setHours(hour)
	event.start = day.toISOString()
	day.setHours(hour+1)
	event.end = day.toISOString()
	return event
}

export default ({time, events, handleClick}) => {
	const style = {
		position: 'relative',
		background: 'lightblue',
		color: 'white'
	}
	return <article role="gridcell" onClick={e => handleClick(newEvent(time))}>
		{events.map((event, i) => {
			const offset = new Date(event.start).getMinutes()/60
			const length = lengthInHours(event.start, event.end)

			style.top = `calc(${offset}*5rem)`
			style.height = `calc(${length}*5rem`

			const startTime = isoDateToTimeString(event.start)
			const endTime = isoDateToTimeString(event.end)
			return (
				<section
					onClick={e => {e.stopPropagation(); handleClick(event)}}
					style={style}
					key={i}
				>
					<h4>{event.title}</h4>
					<p>{`${startTime} - ${endTime}`}</p>
				</section>
			)
		})}
	</article>
}
