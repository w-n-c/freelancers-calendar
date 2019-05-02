import React from 'react'
export default ({days}) => {
		return days.map((events, i) => {
			return (
				<td key={i}>
					<h3>{events.date}</h3>
					<ul>
						{events.map(evt => evt.id ? <li key={evt.id}>{evt.title}</li>: '')}
					</ul>
				</td>
			)
		})
}
