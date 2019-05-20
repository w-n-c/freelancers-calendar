import React from 'react'
export default ({days}) => {
		return days.map(({date, events}, i) => {
			return (
				<td role="cell" key={i}>
					<h3>{date}</h3>
					<ul>
						{events.map(evt => evt.id ? <li key={evt.id}>{evt.title}</li>: '')}
					</ul>
				</td>
			)
		})
}
