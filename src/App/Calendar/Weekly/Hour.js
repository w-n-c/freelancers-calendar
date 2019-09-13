import React from 'react'
import { isoDateToTimeString } from '../utils'
import { timeInHours } from './utils'

const sharedStyle = {
	position: 'relative',
	background: 'lightblue',
	color: 'white'
}

export default ({time, events, handleClick}) =>
	<article onClick={(e) => handleClick('new')}>
		{events.map((event, i) => {
			const offset = new Date(event.start).getMinutes()/60
			const length = timeInHours(event.start, event.end)

			const style = {...sharedStyle}
			style.top = `calc(${offset}*4rem)`
			style.height = `calc(${length}*4rem`

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
