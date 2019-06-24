import React from 'react'

const calcLength = (t1, t2) =>
	Math.abs(
		(new Date(t1) - new Date(t2))
		/ 3600000
	)

export default ({events}) => {
	const style = {
		position: 'relative',
		background: 'lightblue',
		color: 'white'
	}
	return <td role="cell">
		{events.map((event, i) => {
			const offset = new Date(event.start).getMinutes()/60
			const length = calcLength(event.start, event.end)

			style.top = `calc(${offset}*5vw)`
			style.height = `calc(${length}*5vw`

			return (
				<div style={style} key={i}>
					{event.title}
				</div>
			)
		})}
	</td>
}
