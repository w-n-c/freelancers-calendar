import React from 'react'
export default ({days, handleClick}) => {
		return days.map(({date, events}, i) => {
			return (
				<td role="cell" key={i}>
					<h3>{date}</h3>
					<ul>
						{events.map(event => event.id ?
							<li key={event.id} onClick={(e) => handleClick(event)}>
								{event.title}
							</li>
						: '')}
					</ul>
				</td>
			)
		})
}
