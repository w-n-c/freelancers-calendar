import React from 'react'

const diffInMin = (t1, t2) =>
	Math.abs(Math.round(
		(new Date(t1) - new Date(t2))
		/ 60000
	))

export default ({events}) =>
	<td role="cell">
		{events.map((event, i) => {
			const style = {
				position: 'relative',
				background: 'lightblue',
				color: 'white'
			}
			const minutes = new Date(event.start).getMinutes()
			const length = diffInMin(event.start, event.end)

			style.top = `calc(${minutes/60}*5vw)`
			style.height = `calc(${length/60}*5vw`

			return <div style={style} key={i}>
				{event.title}
			</div>
		})}
	</td>
