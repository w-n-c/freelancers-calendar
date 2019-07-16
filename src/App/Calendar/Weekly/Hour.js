import React from 'react'
import { isoDateToTimeString } from '../utils'
import { lengthInHours } from './utils'

export default ({events}) => {
	const style = {
		position: 'relative',
		background: 'lightblue',
		color: 'white'
	}
	return <td role="cell">
		{events.map((event, i) => {
			const offset = new Date(event.start).getMinutes()/60
			const length = lengthInHours(event.start, event.end)

			style.top = `calc(${offset}*5vw)`
			style.height = `calc(${length}*5vw`

			const startTime = isoDateToTimeString(event.start)
			const endTime = isoDateToTimeString(event.end)
			return (
				<div style={style} key={i}>
					{event.title}
					<br />
					{`${startTime} - ${endTime}`}
				</div>
			)
		})}
	</td>
}
